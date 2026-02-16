#!/bin/bash
set -e

echo "Cleaning all labs..."

for LAB_DIR in labs/*; do
  if [ -d "$LAB_DIR" ]; then
    LAB_NAME=$(basename "$LAB_DIR")
    echo "Processing $LAB_NAME..."

    # Destroy Terraform if exists
    if [ -d "$LAB_DIR/terraform" ]; then
      echo "Destroying Terraform for $LAB_NAME..."
      (cd "$LAB_DIR/terraform" && terraform destroy -auto-approve || true)
    fi

    # Delete Kubernetes resources if exists
    if [ -d "$LAB_DIR/infra" ]; then
      echo "Deleting Kubernetes resources for $LAB_NAME..."
      kubectl delete -f "$LAB_DIR/infra" --ignore-not-found
    fi
  fi
done

echo "All labs cleaned."
