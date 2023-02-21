#!/usr/bin/env bash
# exit on error
set -o errexit

./render/set_variables.sh

npm install
npm run build

pipenv install
pipenv run pip freeze

pipenv run migrate

pipenv run upgrade

pipenv run start
