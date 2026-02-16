#!/bin/bash
set -e

LAB=$1

if [ -z "$LAB" ]; then
  echo "You must provide a LAB name."
  exit 1
fi

echo "Starting $LAB..."

bash scripts/build.sh $LAB
bash scripts/infra.sh $LAB
bash scripts/deploy.sh $LAB

echo "$LAB started successfully."
