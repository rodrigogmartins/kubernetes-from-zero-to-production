terraform {
  required_version = ">= 1.3"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true

  endpoints {
    dynamodb = "http://localhost:4566"    
    s3 = "http://localhost:4566"
  }
}

resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
  force_destroy = true

  tags = {
    Environment = "local"
    ManagedBy   = "terraform"
  }

  provisioner "local-exec" {
    when    = destroy
    command = "aws --endpoint-url=http://localhost:4566 s3 rm s3://${self.bucket} --recursive"
  }
}