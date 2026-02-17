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

# Version tag
if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  VERSION=$(git rev-parse --short HEAD)
else
  VERSION=$(date +%Y%m%d%H%M%S)
fi

echo "Building images for $LAB_DIR with version: $VERSION"

BUILT=false

# --------------------------------------------------
# 1️⃣ Caso exista Dockerfile na raiz do LAB
# --------------------------------------------------
if [ -f "$BASE_DIR/Dockerfile" ]; then
  IMAGE_NAME="${LAB_DIR}"
  VERSION_TAG="${IMAGE_NAME}:${VERSION}"
  DEV_TAG="${IMAGE_NAME}:dev"

  echo "Building $VERSION_TAG (root Dockerfile)"
  docker build -t "$VERSION_TAG" "$BASE_DIR"
  docker tag "$VERSION_TAG" "$DEV_TAG"

  echo "✔ Created:"
  echo "   $VERSION_TAG"
  echo "   $DEV_TAG"

  BUILT=true
fi

# --------------------------------------------------
# 2️⃣ Caso existam subpastas com Dockerfile
# --------------------------------------------------
for APP_DIR in "$BASE_DIR"/*; do
  if [ -d "$APP_DIR" ] && [ -f "$APP_DIR/Dockerfile" ]; then
    APP_NAME=$(basename "$APP_DIR")
    IMAGE_NAME="${LAB_DIR}-${APP_NAME}"

    VERSION_TAG="${IMAGE_NAME}:${VERSION}"
    DEV_TAG="${IMAGE_NAME}:dev"

    echo "Building $VERSION_TAG"
    docker build -t "$VERSION_TAG" "$APP_DIR"
    docker tag "$VERSION_TAG" "$DEV_TAG"

    echo "✔ Created:"
    echo "   $VERSION_TAG"
    echo "   $DEV_TAG"

    BUILT=true
  fi
done

# --------------------------------------------------
# 3️⃣ Falha se nada foi buildado
# --------------------------------------------------
if [ "$BUILT" = false ]; then
  echo "No Dockerfiles found in $LAB_DIR"
  exit 1
fi

echo "Build complete."
