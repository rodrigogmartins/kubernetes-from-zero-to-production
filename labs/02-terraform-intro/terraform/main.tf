resource "aws_dynamodb_table" "users" {
  name         = var.table_name
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Environment = "local"
    Service     = "users-api"
  }
}
