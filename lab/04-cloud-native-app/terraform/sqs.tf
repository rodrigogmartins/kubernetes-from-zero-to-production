resource "aws_sqs_queue" "events_queue" {
  name = var.queue_name
}