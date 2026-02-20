#!/bin/bash
set -e

LAB_DIR=$1
K8S_DIR="${LAB_DIR}/infra"
NAMESPACE="${LAB_DIR}"

if [ -z "$LAB_DIR" ]; then
  echo "You must provide a LAB directory."
  exit 1
fi

if [ ! -d "$K8S_DIR" ]; then
  echo "Kubernetes manifests not found for $LAB_DIR"
  exit 1
fi

echo "Ensuring namespace $NAMESPACE exists..."
kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

echo "Deploying manifests from $K8S_DIR into namespace $NAMESPACE..."
kubectl apply -f "$K8S_DIR" -n "$NAMESPACE" --recursive

echo "Restarting deployments in namespace $NAMESPACE..."

DEPLOYMENTS=$(kubectl get deployments -n "$NAMESPACE" -o name)

for DEPLOY in $DEPLOYMENTS; do
  kubectl rollout restart "$DEPLOY" -n "$NAMESPACE"
  kubectl rollout status "$DEPLOY" -n "$NAMESPACE"
done

echo "Deploy complete."