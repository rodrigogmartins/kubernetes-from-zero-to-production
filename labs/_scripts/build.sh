#!/bin/bash
set -e

LAB_DIR=$1

if [ -z "$LAB_DIR" ]; then
  echo "You must provide a LAB directory."
  exit 1
fi

BASE_DIR="labs/${LAB_DIR}"

if [ ! -d "$BASE_DIR" ]; then
  echo "Lab directory not found: $LAB_DIR"
  exit 1
fi

# Version tag
if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  VERSION=$(git rev-parse --short HEAD)
else
  VERSION=$(date +%Y%m%d%H%M%S)
fi

echo "Building images for $LAB_DIR with version: $VERSION"

for APP_DIR in "$BASE_DIR"/*; do
  if [ -d "$APP_DIR" ] && [ -f "$APP_DIR/Dockerfile" ]; then
    APP_NAME=$(basename "$APP_DIR")
    IMAGE_NAME="${LAB_DIR}-${APP_NAME}"

    VERSION_TAG="${IMAGE_NAME}:${VERSION}"
    DEV_TAG="${IMAGE_NAME}:dev"

    echo "Building $VERSION_TAG"
    docker build -t "$VERSION_TAG" "$APP_DIR"
    docker tag "$VERSION_TAG" "$DEV_TAG"
  fi
done

echo "Build complete."
