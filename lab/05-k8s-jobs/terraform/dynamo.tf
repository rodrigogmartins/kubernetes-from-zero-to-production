resource "aws_dynamodb_table" "logs_table" {
  name         = var.table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "N"
  }

  global_secondary_index {
    name               = "created_at-index"
    projection_type = "ALL"
    
    key_schema {
      attribute_name = "pk"
      key_type       = "HASH"
    }


    key_schema {
      attribute_name = "created_at"
      key_type       = "RANGE"
    }
  }
}
