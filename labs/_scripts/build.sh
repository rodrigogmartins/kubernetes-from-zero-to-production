#!/bin/bash
set -e

LAB_DIR=$1

if [ -z "$LAB_DIR" ]; then
  echo "You must provide a LAB directory."
  exit 1
fi

BASE_DIR="${LAB_DIR}"

if [ ! -d "$BASE_DIR" ]; then
  echo "Lab directory not found: $LAB_DIR"
  exit 1
fi

echo "Building images for $LAB_DIR (tag: dev)"

BUILT=false

if [ -f "$BASE_DIR/Dockerfile" ]; then
  IMAGE_NAME="${LAB_DIR}"
  DEV_TAG="${IMAGE_NAME}:dev"

  echo "Building $DEV_TAG (root Dockerfile)"
  docker build -t "$DEV_TAG" "$BASE_DIR"

  echo "✔ Created:"
  echo "   $DEV_TAG"

  BUILT=true
fi

for APP_DIR in "$BASE_DIR"/*; do
  if [ -d "$APP_DIR" ] && [ -f "$APP_DIR/Dockerfile" ]; then
    APP_NAME=$(basename "$APP_DIR")
    IMAGE_NAME="${LAB_DIR}-${APP_NAME}"
    DEV_TAG="${IMAGE_NAME}:dev"

    echo "Building $DEV_TAG"
    docker build -t "$DEV_TAG" "$APP_DIR"

    echo "✔ Created:"
    echo "   $DEV_TAG"

    BUILT=true
  fi
done

if [ "$BUILT" = false ]; then
  echo "No Dockerfiles found in $LAB_DIR"
  exit 1
fi

echo "Cleaning dangling images..."
docker image prune -f

echo "Build complete."