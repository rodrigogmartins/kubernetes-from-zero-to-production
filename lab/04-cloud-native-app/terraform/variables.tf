variable "bucket_name" {
  description = "S3 bucket name"
  type        = string
  default     = "local-files-bucket"
}

variable "queue_name" {
  description = "SQS queue name"
  type        = string
  default     = "s3-events"
}

variable "function_name" {
  description = "Lambda function name"
  type        = string
  default     = "sqs-consumer"
}

variable "function_zip_dir" {
  description = "Lambda zip file location"
  type        = string
  default     = "lambda-s3-events"
}

variable "function_zip_name" {
  description = "Lambda zip file name"
  type        = string
  default     = "lambda.zip"
}

variable "table_name" {
  description = "DynamoDB table name"
  type        = string
  default     = "files-table"
}
