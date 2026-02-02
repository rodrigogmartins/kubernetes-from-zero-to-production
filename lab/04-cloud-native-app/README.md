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

### 1️. Start LocalStack

Run the following command to start LocalStack with DynamoDB enabled:

```bash
docker run -d \
  -p 4566:4566 \
  -e SERVICES=dynamodb,s3,iam,lambda,sqs \
  -e DEBUG=1 \
  -v //var/run/docker.sock:/var/run/docker.sock \
  --name localstack \
  localstack/localstack
```

docker run --rm -it ^
  -p 4566:4566 ^
  -e SERVICES=dynamodb,s3,iam,lambda,sqs ^
  -e DEBUG=1 ^
  -v //var/run/docker.sock:/var/run/docker.sock ^
  localstack/localstack

Verify the container is running:

```bash
docker ps
```

---

### 2. Initialize Terraform

Navigate to the lab directory:

```bash
cd terraform/localstack
```

Initialize Terraform:

```bash
terraform init
```

---

### 3. Apply the infrastructure

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

### 4. Validate the table creation

Use the AWS CLI pointing to the LocalStack endpoint:

```bash
aws --endpoint-url=http://localhost:4566 dynamodb list-tables
```

Expected output:

```json
{
  "TableNames": ["users"]
}
```

### 5. Build Docker image

```bash
docker build -t terraform-intro:v1 .
```

### 6. Run project with Kubernetes

```bash
kubectl apply -f infra
```

### 6. Verify result

#### Create user

```bash
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "user-123",
    "name": "John Wick",
    "email": "john@example.com"
  }'
```

#### Query user

```bash
curl --request GET --url http://localhost:3000/users/user-123
```

#### Update user

```bash
curl --request PUT \
  --url http://localhost:3000/users/user-123 \
  --header 'Content-Type: application/json'
  --data '{
    "id": "user-123",
    "name": "Winston Scott",
    "email": "winston@continental.com"
  }'
```

#### Delete user

```bash
curl --request DELETE --url http://localhost:3000/users/user-123
```

## 🧹 Destroying resources

To stop Kubernetes deployment and service:

```bash
kubectl delete -f infra
```

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

## ✅ Conclusion

This lab demonstrates how to use Terraform to provision AWS infrastructure locally, enabling fast, safe, and reproducible development workflows.

It serves as a solid foundation for more advanced studies in:

- Infrastructure as Code (IaC)
- DynamoDB internals
- Backend platform engineering
- Kubernetes and cloud-native architectures

build lamdbda:

Linux:
GOOS=linux GOARCH=amd64 go build -o bootstrap lambda-s3-events/main.go

compress:
tar -tf lambda.zip

Windows:
$env:GOOS="linux"; $env:GOARCH="amd64"; cd lambda-s3-events; go build -o bootstrap ; cd ..

Compress-Archive -Path .\lambda-s3-events\bootstrap -DestinationPath .\lambda-s3-events\lambda.zip -Force
