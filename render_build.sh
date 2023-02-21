#!/usr/bin/env bash
# exit on error
set -o errexit
touch .env
echo "BASENAME=$BASENAME" >> .env
echo "DATABASE_URL=$DATABASE_URL" >> .env
cat .env

exit 1;

npm install
npm run build

pipenv install

pipenv run upgrade
