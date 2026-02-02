# Create IAM Role
resource "aws_iam_role" "lambda_role" {
  name = "lambda-sqs-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

# Create lambda <> SQS policy
resource "aws_iam_role_policy" "lambda_policy" {
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes"
      ]
      Resource = "*"
    }]
  })
}

# Create lambda <> Dynamo policy
resource "aws_iam_role_policy" "lambda_dynamo" {
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:PutItem"
      ]
      Resource = aws_dynamodb_table.files_table.arn
    }]
  })
}

# Create lambda function
resource "aws_lambda_function" "sqs_consumer" {
  function_name = var.function_name
  filename = format("../%s/%s", var.function_zip_dir, var.function_zip_name)

  runtime = "provided.al2"
  handler = "bootstrap"


  role = aws_iam_role.lambda_role.arn

  source_code_hash = filebase64sha256(format("../%s/%s", var.function_zip_dir, var.function_zip_name))

  environment {
    variables = {
      AWS_REGION = "us-east-1"
      FILES_TABLE = aws_dynamodb_table.files_table.name
    }
  }
}

# Create lambda event source
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  event_source_arn = aws_sqs_queue.events_queue.arn
  function_name    = aws_lambda_function.sqs_consumer.arn

  batch_size       = 1
  enabled          = true
}