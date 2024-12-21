# setlist-sherlock/webhooks

## Terraform

The terraform file is created with and is compatible with OpenTofu. Make sure you're using OpenTofu instead of Terraform to execute any .tf files in this directory.

## Webhook

The webhook is designed to work with AWS Lambda and [Expo EAS](https://expo.dev/eas). It's registered as a ["build webhook"](https://docs.expo.dev/eas/webhooks/) and triggers a GitHub workflow with metadata provided by EAS. The purpose is to add build artifacts to GitHub releases, which is used by F-Droid.

### Why?

It's cheaper to use a webhook instead of waiting for the build to complete in a GHA.

## Setup

1. Zip it as add-eas-build-to-release.zip
1. Copy the `.auto.tfvars.example` to `.auto.tfvars` and replace the "github_pat_EXAMPLE" value with your fine-grained access token. It should only have access to your repository, with read + write access to actions.
1. Also add your Expo webhook secret you used when you created your webhook.
1. Apply Terraform change
