#!/bin/bash
set -e

LAB=$1

if [ -z "$LAB" ]; then
  echo "You must provide a LAB name."
  exit 1
fi

echo "Destroying Kubernetes resources for $LAB..."

kubectl delete -f labs/${LAB}/k8s/ || true

echo "Destroying infrastructure for $LAB..."

cd labs/${LAB}/terraform

terraform destroy -auto-approve

echo "$LAB destroyed successfully."
