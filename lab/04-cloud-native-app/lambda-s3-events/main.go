package main

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/google/uuid"
)

type FileEvent struct {
	ID       string `dynamodbav:"id"`
	FileName string `dynamodbav:"file_name"`
	Size     int64  `dynamodbav:"size"`
}

var (
	tableName string
	dbClient  *dynamodb.Client
)

func init() {
	tableName = os.Getenv("FILES_TABLE")

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("failed to load aws config: %v", err)
	}

	dbClient = dynamodb.NewFromConfig(cfg)
}

func handler(ctx context.Context, sqsEvent events.SQSEvent) error {
	for _, record := range sqsEvent.Records {

		var s3Event events.S3Event
		if err := json.Unmarshal([]byte(record.Body), &s3Event); err != nil {
			log.Println("failed to unmarshal s3 event:", err)
			continue
		}

		for _, s3Record := range s3Event.Records {
			item := FileEvent{
				ID:       uuid.NewString(),
				FileName: s3Record.S3.Object.Key,
				Size:     s3Record.S3.Object.Size,
			}

			av, err := attributevalue.MarshalMap(item)
			if err != nil {
				log.Println("failed to marshal item:", err)
				continue
			}

			_, err = dbClient.PutItem(ctx, &dynamodb.PutItemInput{
				TableName: aws.String(tableName),
				Item:      av,
			})
			if err != nil {
				log.Println("failed to put item:", err)
				continue
			}

			log.Printf("saved file event: %+v\n", item)
		}
	}
	return nil
}

func main() {
	lambda.Start(handler)
}
