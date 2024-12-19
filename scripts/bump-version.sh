#!/usr/bin/env bash
# https://gist.github.com/rverst/1f0b97da3cbeb7d93f4986df6e8e5695

function chsv_check_version() {
  if [[ $1 =~ ^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-((0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*))*))?(\+([0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*))?$ ]]; then
    echo "$1"
  else
    echo ""
  fi
}

if [[ $(chsv_check_version($1)) ]]; then
  echo "nice"
  # update package.json
  # update gradle
  # update f-droid yaml
  # create f-droid release note with $2 contents
  # create commit
  # create tag
