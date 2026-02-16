variable "lab" {
  description = "Lab to deploy"
  type        = string
}

variable "localstack_endpoint" {
  type    = string
  default = "http://localhost:4566"
}