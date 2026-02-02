output "bucket_name" {
  value = aws_s3_bucket.files_bucket.bucket
}

output "lambda_name" {
  value = aws_lambda_function.sqs_consumer
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.files_table.name
}