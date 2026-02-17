#!/bin/bash
set -e

LAB_DIR=$1
K8S_DIR="${LAB_DIR}/infra"

if [ -z "$LAB_DIR" ]; then
  echo "You must provide a LAB directory."
  exit 1
fi

if [ ! -d "$K8S_DIR" ]; then
  echo "Kubernetes manifests not found for $LAB_DIR"
  exit 1
fi

echo "Deploying $LAB_DIR..."

kubectl apply -f "$K8S_DIR"

echo "Restarting deployments..."
for DEPLOY in $(kubectl get deployments -o name | grep "${LAB_DIR}-"); do
  kubectl rollout restart "$DEPLOY"
  kubectl rollout status "$DEPLOY"
done

echo "Deploy complete."
