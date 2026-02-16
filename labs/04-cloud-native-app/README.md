# Lab-04 — AWS Services integration locally

## 🎯 Objective

The goal of this lab is to demonstrate how to **provision a more complex infastrucutre locally using Terraform**, using **LocalStack**, as a foundation for backend development and testing.

This lab simulates a real-world Infrastructure as Code (IaC) workflow and allows you to:

- Provision AWS resources locally
- Manage infrastructure using Terraform
- Develop and test backend services without using real AWS resources

## App Flow

1. File uploaded from API
2. File is saved in S3
3. S3 triggers event to SQS
4. Lambda consume SQS message and save the event data in DynamoDB table

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

Verify the container is running:

```bash
docker ps
```

---

### 2. Initialize Terraform

Navigate to the lab directory:

```bash
cd terraform
```

Initialize Terraform:

```bash
terraform init
```

---

### 3. Build Lambda file

Linux:

```bash
GOOS=linux GOARCH=amd64 && \
cd lambda-s3-eventsgo && \
build -o bootstrap && \
cd ..
```

Compress the bootstrap file:

```bash
tar -tf ./lambda-s3-events/lambda.zip
```

Windows:

```bash
$env:GOOS="linux"; $env:GOARCH="amd64"; cd lambda-s3-events; go build -o bootstrap ; cd ..
```

Compress the bootstrap file:

```bash
Compress-Archive -Path .\lambda-s3-events\bootstrap -DestinationPath .\lambda-s3-events\lambda.zip -Force
```

---

### 4. Apply the infrastructure

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

### 5. Build Docker image

```bash
docker build -t cloud-app:v1 ./file-upload-api
```

### 6. Run project with Kubernetes

```bash
kubectl apply -f infra
```

### 7. Verify result

#### Upload file to S3

```bash
curl --request POST \
  --url http://localhost:8080/upload \
  --form 'file=@/path/to/file.txt'
```

#### List files in S3 bucket

```bash
curl --request GET --url http://localhost:8080/files
```

#### List files in DynamoDB

```bash
curl --request GET --url http://localhost:8080/files-db
```

> It might take a moment for results to appear in the DynamoDB table, as it's an asynchronous process.

## 🧹 Destroying resources

To stop Kubernetes deployment and service:

```bash
kubectl delete -f infra
```

To remove the DynamoDB table created by Terraform:

```bash
cd terraform

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