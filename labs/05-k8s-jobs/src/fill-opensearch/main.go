package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type LogItem struct {
	ID        string `dynamodbav:"id" json:"id"`
	PK        string `dynamodbav:"pk" json:"pk"`
	CreatedAt int64  `dynamodbav:"created_at" json:"created_at"`
	Log       struct {
		Message string `dynamodbav:"message" json:"message"`
	} `dynamodbav:"log" json:"log"`
}

func main() {
	ctx := context.Background()

	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		log.Fatalf("unable to load AWS config: %v", err)
	}

	dynamoClient := dynamodb.NewFromConfig(cfg)

	tableName := "logs"
	indexName := "created_at-index"

	queryInput := &dynamodb.QueryInput{
		TableName:              &tableName,
		IndexName:              &indexName,
		KeyConditionExpression: awsString("pk = :pk"),
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":pk": &types.AttributeValueMemberS{Value: "LOG"},
		},
		ScanIndexForward: awsBool(false),
		Limit:            awsInt32(10),
	}

	resp, err := dynamoClient.Query(ctx, queryInput)
	if err != nil {
		log.Fatalf("failed to query dynamo: %v", err)
	}

	var items []LogItem
	err = attributevalue.UnmarshalListOfMaps(resp.Items, &items)
	if err != nil {
		log.Fatalf("failed to unmarshal: %v", err)
	}

	fmt.Printf("Found %d items\n", len(items))

	opensearchURL := os.Getenv("OPENSEARCH_URL")
	if opensearchURL == "" {
		opensearchURL = "http://localhost:9200"
	}

	for _, item := range items {
		err := indexToOpenSearch(opensearchURL, "logs-index", item)
		if err != nil {
			log.Printf("error indexing %s: %v", item.ID, err)
		}
	}
}

func indexToOpenSearch(baseURL, index string, doc LogItem) error {
	url := fmt.Sprintf("%s/%s/_doc/%s", baseURL, index, doc.ID)

	body, err := json.Marshal(doc)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("PUT", url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return fmt.Errorf("opensearch returned status %d", resp.StatusCode)
	}

	return nil
}

func awsString(s string) *string { return &s }
func awsBool(b bool) *bool       { return &b }
func awsInt32(i int32) *int32    { return &i }
