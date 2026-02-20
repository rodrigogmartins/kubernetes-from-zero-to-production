terraform {
  backend "s3" {
    bucket                      = "terraform-state"
    key                         = "project/dev/terraform.tfstate"
    region                      = "us-east-1"

    endpoint                    = "http://localhost:4566"

    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    force_path_style            = true

    dynamodb_table              = "terraform-lock"
    encrypt                     = false
  }
}
