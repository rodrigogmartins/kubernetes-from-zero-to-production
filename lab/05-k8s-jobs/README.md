# teste

docker build -t dynamo-create-logs-cronjob:v1 ./upload-logs

aws dynamodb scan `
  --table-name logs-table `
  --select COUNT `
  --profile localstack `
  --endpoint-url http://localhost:4566
