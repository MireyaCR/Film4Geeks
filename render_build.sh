#!/usr/bin/env bash
# exit on error
set -o errexit

./render/set_variables.sh

npm install
npm run build

pipenv install

pipenv run upgrade
