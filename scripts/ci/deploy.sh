#!/bin/sh
if [ "$TRAVIS_BRANCH" = "master" ]; then
  export FIREBASE_PROJECT=prod
else
  export FIREBASE_PROJECT=default
fi
yarn firebase use $FIREBASE_PROJECT --token=$FIREBASE_CI_TOKEN
yarn firebase deploy --token=$FIREBASE_CI_TOKEN
