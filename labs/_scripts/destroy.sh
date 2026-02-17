#!/bin/bash
set -e

LAB=$1

if [ -z "$LAB" ]; then
  echo "You must provide a LAB name."
  exit 1
fi

BASE_DIR="${LAB}"
TERRAFORM_DIR="${BASE_DIR}/terraform"
INFRA_DIR="${BASE_DIR}/infra"

if [ ! -d "$BASE_DIR" ]; then
  echo "Lab directory not found: $LAB"
  exit 1
fi

echo "Destroying Kubernetes resources for $LAB..."

if [ -d "$INFRA_DIR" ]; then
  kubectl delete -f "$INFRA_DIR/" || true
else
  echo "No infra directory found. Skipping Kubernetes cleanup."
fi

echo "Destroying infrastructure for $LAB..."

if [ -d "$TERRAFORM_DIR" ]; then
  cd "$TERRAFORM_DIR"
  terraform destroy -auto-approve
else
  echo "No terraform directory found. Skipping Terraform destroy."
fi

echo "$LAB destroyed successfully."
