# Lab-02 — DynamoDB Local with Terraform

## 🎯 Objective

The goal of this lab is to demonstrate how to **provision a DynamoDB table locally using Terraform**, using **LocalStack**, as a foundation for backend development and testing.

This lab simulates a real-world Infrastructure as Code (IaC) workflow and allows you to:

- Provision AWS resources locally
- Manage infrastructure using Terraform
- Develop and test backend services without using real AWS resources
- Integrate DynamoDB with a Go-based API

## 🧠 What you will learn

- How to configure the AWS provider for LocalStack
- How to create a DynamoDB table using Terraform
- How to validate DynamoDB resources locally
- How to prepare infrastructure for consumption by a backend API

## 📦 Resources created

- 1 DynamoDB table
  - Name: `users` (configurable)
  - Partition Key: `id` (String)
  - Billing mode: `PAY_PER_REQUEST`

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- Docker
- Terraform >= 1.3
- AWS CLI
- PowerShell (Windows) or a compatible terminal

Optional (recommended):

- Go (to run the API locally)

## 🚀 How to run the lab

### 1️⃣ Start LocalStack

Run the following command to start LocalStack with DynamoDB enabled:

```bash
docker run -d \
  -p 4566:4566 \
  -e SERVICES=dynamodb \
  -e DEBUG=1 \
  --name localstack \
  localstack/localstack
```

Verify the container is running:

```bash
docker ps
```

---

### 2️⃣ Initialize Terraform

Navigate to the lab directory:

```bash
cd terraform/localstack
```

Initialize Terraform:

```bash
terraform init
```

---

### 3️⃣ Apply the infrastructure

Run:

```bash
terraform apply
```

Confirm with:

```bash
yes
```

Once completed, the DynamoDB table will be created in LocalStack.

---

### 4️⃣ Validate the table creation

Use the AWS CLI pointing to the LocalStack endpoint:

```bash
aws --endpoint-url=http://localhost:4566 \
    dynamodb list-tables
```

Expected output:

```json
{
  "TableNames": ["users"]
}
```

## 🔌 Integration with the Go API

To connect the API to the local DynamoDB instance, use:

- Endpoint: `http://localhost:4566`
- Region: `us-east-1`
- Table name: `users`

Example environment variables:

```bash
export AWS_REGION=us-east-1
export DYNAMODB_TABLE=users
```

In the application, the DynamoDB client must be configured to use the LocalStack endpoint explicitly.

## 🧹 Destroying resources

To remove the DynamoDB table created by Terraform:

```bash
terraform destroy
```

Confirm with:

```bash
yes
```

## ⚠️ Important notes

- This lab does **not** use real AWS credentials
- Credentials are mocked (`test / test`)
- LocalStack is used strictly for local development
- Never use this configuration in production environments

## 📌 Suggested next steps

- Add TTL support to the DynamoDB table
- Create Global Secondary Indexes (GSIs)
- Enable DynamoDB Streams
- Add integration tests using DynamoDB Local
- Integrate this lab with the Go CRUD API

## ✅ Conclusion

This lab demonstrates how to use Terraform to provision AWS infrastructure locally, enabling fast, safe, and reproducible development workflows.

It serves as a solid foundation for more advanced studies in:

- Infrastructure as Code (IaC)
- DynamoDB internals
- Backend platform engineering
- Kubernetes and cloud-native architectures
