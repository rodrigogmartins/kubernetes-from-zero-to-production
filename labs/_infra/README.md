# Terraform – Setup and Usage Guide

## Overview

### This project follows a modular Terraform architecture designed to:

- Isolate infrastructure components into reusable modules  
- Allow logical environment separation using workspaces  
- Support local development with LocalStack  
- Store Terraform state remotely using S3 (or LocalStack S3)

### The structure promotes

- Clear separation of concerns  
- Predictable infrastructure lifecycle  
- Safe change management via `plan` before `apply`  
- Easy extensibility through modular design  

## Architecture Pattern

This repository follows the **Root Module + Child Modules** pattern.

### Root Module Responsibilities

- Configure the backend (S3)
- Configure the provider (AWS / LocalStack)
- Select and orchestrate modules
- Manage workspaces

### Child Module Responsibilities

- Define specific infrastructure resources
- Expose variables as inputs
- Expose outputs when necessary
- Remain reusable and isolated

---

## Getting Started (Fresh Clone)

If you have just cloned this repository, follow the steps below.

### 1. Start LocalStack (if applicable)

```bash
docker compose up -d
```

### 2. Ensure the Backend S3 Bucket Exists

Terraform **cannot create its own backend bucket**.

Create it manually (AWS CLI or LocalStack):

```bash
aws --endpoint-url=http://localhost:4566 s3 mb s3://terraform-state --profile=localstack

aws --endpoint-url=http://localhost:4566 dynamodb create-table `
  --table-name terraform-lock `
  --attribute-definitions AttributeName=LockID,AttributeType=S `
  --key-schema AttributeName=LockID,KeyType=HASH `
  --billing-mode PAY_PER_REQUEST  --profile=localstack

```

### 3. Initialize Terraform

```bash
terraform init
```

#### 3.1. If backend configuration was modified

```bash
terraform init -reconfigure
```

#### 3.2. If provider versions were modified

```bash
terraform init -upgrade
```

## 4. Validate Configuration

```bash
terraform validate
```

## 5. Review Execution Plan

```bash
terraform plan
```

## 6. Apply Infrastructure

```bash
terraform apply
```

---

## Common Scenarios

### I Changed the Provider Configuration

Examples:

- Updated provider version
- Modified provider endpoints
- Changed AWS credentials
- Switched between AWS and LocalStack

You must run:

```bash
terraform init -reconfigure
```

If you changed the provider version:

```bash
terraform init -upgrade
```

Then validate and plan again:

```bash
terraform validate
terraform plan
```

---

## I Added a New Module

### Steps

#### 1. Create a new folder inside `labs/`

#### 2. Add at least

- `main.tf`
- `variables.tf`
- `outputs.tf` (if needed)

#### 3. Reference the module inside the root `main.tf`

```md
module "new_lab" {
    source = "../../new_lab/terraform"
    #pass required variables here
}
```

#### 4. Run

```bash
terraform init
terraform validate
terraform plan
```

#### If the module introduces new providers

```bash
terraform init -upgrade
```

---

## I Modified main.tf

Always follow this safe workflow:

```bash
terraform validate
terraform plan
terraform apply
```

Never skip `plan`.  
Review resource creation, updates, or destruction carefully.

---

## State Management

- Backend uses S3
- Each workspace maintains isolated state
- Backend bucket must exist before `terraform init`
- `.terraform/` must NOT be versioned
- `.terraform.lock.hcl` SHOULD be versioned

---

## Expanding the Lab

To safely expand this project:

- Keep modules small and focused
- Avoid hardcoding values (use variables)
- Expose only necessary outputs
- Keep provider configuration centralized in the root module
- Always run `validate` and `plan` before `apply`

## Safe Workflow Summary

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

This ensures predictable, safe, and scalable infrastructure management.

---

## Technical References

- Terraform Docs  
  https://developer.hashicorp.com/terraform/docs

- AWS Provider  
  https://registry.terraform.io/providers/hashicorp/aws/latest

- S3 Backend  
  https://developer.hashicorp.com/terraform/language/settings/backends/s3

- LocalStack  
  https://docs.localstack.cloud/