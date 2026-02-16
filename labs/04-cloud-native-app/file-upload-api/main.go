package main

import (
	"context"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/s3"

	handlers "github.com/kubernetes-from-zero-to-production/lab-04-file-upload/handlers"
)

func main() {

	cfg, err := config.LoadDefaultConfig(
		context.TODO(),
		config.WithRegion("us-east-1"),
		config.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider("test", "test", ""),
		),
	)

	if err != nil {
		log.Fatal(err)
	}

	s3Client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String("http://host.docker.internal:4566")
		o.UsePathStyle = true
	})

	bucket := "local-files-bucket"
	tableName := "files-table"

	dynamoClient := dynamodb.NewFromConfig(cfg, func(o *dynamodb.Options) {
		o.Retryer = aws.NopRetryer{}
	})

	http.Handle("/upload", &handlers.UploadHandler{
		S3Client:   s3Client,
		BucketName: bucket,
	})

	http.Handle("/files", &handlers.ListHandler{
		S3Client:   s3Client,
		BucketName: bucket,
	})

	http.Handle("/files-db", &handlers.ListFilesHandler{
		DynamoClient: dynamoClient,
		TableName:    tableName,
	})

	log.Println("Server running on http://0.0.0.0:3000")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}
}
