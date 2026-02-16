

```bash
docker run -d \
  -p 4566:4566 \
  -e SERVICES=dynamodb \
  -e DEBUG=1 \
  --name localstack \
  localstack/localstack
```


```bash
docker run -d `
  -p 4566:4566 `
  -e SERVICES=dynamodb,secretsmanager `
  -e DEBUG=1 `
  --name localstack `
  localstack/localstack
```
Install exo

```bash
helm repo add external-secrets https://charts.external-secrets.io

helm install external-secrets external-secrets/external-secrets `
  -n external-secrets `
  --create-namespace `
  --set installCRDs=true `
  --set extraEnv[0].name=AWS_REGION `
  --set extraEnv[0].value=us-east-1 `
  --set extraEnv[1].name=AWS_ACCESS_KEY_ID `
  --set extraEnv[1].value=test `
  --set extraEnv[2].name=AWS_SECRET_ACCESS_KEY `
  --set extraEnv[2].value=test `
  --set extraEnv[3].name=AWS_ENDPOINT_URL `
  --set extraEnv[3].value=http://host.docker.internal:4566


# aws secretsmanager get-secret-value --secret-id passkey_secret --query SecretString --output text --profile localstack

# aws secretsmanager get-secret-value --secret-id passkey_secret --query 'SecretString' --output text --profile localstack

# aws secretsmanager list-secrets --profile localstack

```

# Ler autoscale do k8s patterns (ignorar tópico key native)
# catpitulo de estado do terraform
# arrumar o terraform local