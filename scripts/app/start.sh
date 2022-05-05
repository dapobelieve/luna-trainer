#!/usr/bin/env bash

set -e
echo  "App is running in $NODE_ENV mode"

if [ "$NODE_ENV" == "production" ] || [ "$NODE_ENV" == "staging" ] ; then
  npm run build && npm run start
else
  npm run dev
fi
