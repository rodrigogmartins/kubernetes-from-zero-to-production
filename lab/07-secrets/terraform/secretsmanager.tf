resource "aws_secretsmanager_secret" "passkey" {
  name = "passkey"
}

resource "aws_secretsmanager_secret_version" "passkey_secret" {
  secret_id     = aws_secretsmanager_secret.passkey.id
  secret_string = "ANY_SECRET_VALUE"
}
