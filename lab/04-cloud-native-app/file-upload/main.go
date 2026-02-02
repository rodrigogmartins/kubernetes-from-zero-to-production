package main

import (
	"context"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
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
		o.BaseEndpoint = aws.String("http://localhost:4566")
		o.UsePathStyle = true
	})
	bucket := "local-files-bucket"

	http.Handle("/upload", &handlers.UploadHandler{
		S3Client:   s3Client,
		BucketName: bucket,
	})

	http.Handle("/files", &handlers.ListHandler{
		S3Client:   s3Client,
		BucketName: bucket,
	})

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
