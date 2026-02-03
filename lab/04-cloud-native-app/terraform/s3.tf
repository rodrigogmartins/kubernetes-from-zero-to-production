resource "aws_s3_bucket" "files_bucket" {
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

# Precisa de uma role para o S3 enviar eventos para o SQS

# Create notification from S3 to SQS queue
resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.files_bucket.id

  queue {
    queue_arn = aws_sqs_queue.events_queue.arn
    events    = ["s3:ObjectCreated:*"]
  }

  # Normalmente não é necessário.
  # Terraform tem a dependência implícita com base nas referências entre recursos (id de recurso / arn)
  depends_on = [aws_s3_bucket.files_bucket, aws_sqs_queue.events_queue]
}