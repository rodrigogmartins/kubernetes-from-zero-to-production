#!/bin/bash
set -e

LAB=$1

if [ ! -d "$LAB/terraform" ]; then
  echo "Terraform directory not found for $LAB"
  exit 0
fi

echo "Provisioning infrastructure for $LAB..."

cd ${LAB}/terraform

terraform init
terraform apply -auto-approve
