package main

import (
	"context"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/google/uuid"
)

const (
	tableName = "logs-table"
	batchSize = 20
)

func main() {
	ctx := context.Background()

	cfg, err := config.LoadDefaultConfig(
		ctx,
		config.WithRegion("us-east-1"),
		config.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider("test", "test", ""),
		),
	)

	if err != nil {
		log.Fatal(err)
	}

	dynamoClient := dynamodb.NewFromConfig(cfg, func(o *dynamodb.Options) {
		o.Retryer = aws.NopRetryer{}
	})

	writeRequests := make([]types.WriteRequest, 0, batchSize)

	for i := 0; i < batchSize; i++ {
		id := uuid.NewString()

		item := map[string]types.AttributeValue{
			"id": &types.AttributeValueMemberS{
				Value: id,
			},
			"pk": &types.AttributeValueMemberS{
				Value: "LOG",
			},
			"created_at": &types.AttributeValueMemberN{
				Value: strconv.FormatInt(time.Now().Unix(), 10),
			},
			"log": &types.AttributeValueMemberM{
				Value: map[string]types.AttributeValue{
					"message": &types.AttributeValueMemberS{
						Value: fmt.Sprintf("dummy log message id: %v", id),
					},
				},
			},
		}

		writeRequests = append(writeRequests, types.WriteRequest{
			PutRequest: &types.PutRequest{
				Item: item,
			},
		})
	}

	_, err = dynamoClient.BatchWriteItem(ctx, &dynamodb.BatchWriteItemInput{
		RequestItems: map[string][]types.WriteRequest{
			tableName: writeRequests,
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Cronjob finishied: %d logs createds\n", batchSize)

}
