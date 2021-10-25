#!/usr/bin/env bash

set -e
echo  "Node version of app is $NODE_ENV"

if [ "$NODE_ENV" == "production" ] || [ "$NODE_ENV" == "staging" ] ; then
  npm run build && npm run start
else
  npm run dev
fi
