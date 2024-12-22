########
# Setup
########

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "setlist-sherlock-tf-state"
    key    = "state.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = "eu-central-1"
}

variable "gh_bearer" {
  type        = string
  description = "Fine-grained personal access token with r/w access to actions"
  sensitive   = true
}

variable "hook_secret" {
  type        = string
  description = "The 16+ character secret provided to Expo that is used to create the expo-signature HTTP header."
  sensitive   = true
}

variable "default_tags" {
  type = map(string)
  default = {
    "Terraform" = "true"
  }
  description = "Tags to use for all Terraform-generated resources"
}

data "archive_file" "fn_src_add_eas_build_to_release" {
  type        = "zip"
  source_file = "index.mjs"
  output_path = "add-eas-build-to-release.zip"
}

###############
# Needed Parts
###############

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
  tags               = var.default_tags
}

resource "aws_iam_role_policy_attachment" "terraform_lambda_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

############
# Functions
############

resource "aws_lambda_function" "fn_add_eas_build_to_release" {
  role             = aws_iam_role.iam_for_lambda.arn
  function_name    = "setlist-sherlock-add-eas-build-to-release"
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  filename         = data.archive_file.fn_src_add_eas_build_to_release.output_path
  source_code_hash = data.archive_file.fn_src_add_eas_build_to_release.output_base64sha256

  environment {
    variables = {
      GH_BEARER   = var.gh_bearer
      HOOK_SECRET = var.hook_secret
    }
  }

  tags = var.default_tags
}

resource "aws_lambda_function_url" "fn_url_add_eas_build_to_release" {
  function_name      = aws_lambda_function.fn_add_eas_build_to_release.function_name
  authorization_type = "NONE"
  cors {
    allow_headers = ["expo-signature", "content-type", "origin"]
    allow_methods = ["POST"]
    allow_origins = ["*"] // until we determine what the correct origin is
  }
}
