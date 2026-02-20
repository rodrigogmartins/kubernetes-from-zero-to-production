provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3             = var.localstack_endpoint
    sqs            = var.localstack_endpoint
    dynamodb       = var.localstack_endpoint
    lambda         = var.localstack_endpoint
    secretsmanager = var.localstack_endpoint
  }
}

module "lab-02" {
  source = "../../02-terraform-intro/terraform"
  count  = var.lab == "lab-02" ? 1 : 0
}

module "lab_05" {
  source = "../../05-k8s-jobs/terraform"
  count  = var.lab == "lab-05" ? 1 : 0
}

module "lab_07" {
  source = "../../07-secrets/terraform"
  count  = var.lab == "lab-07" ? 1 : 0
}

module "lab_08" {
  source = "../../08-keda-scaling/terraform"
  count  = var.lab == "lab-08" ? 1 : 0
}
