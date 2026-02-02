package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type FileItem struct {
	ID       string `json:"id" dynamodbav:"id"`
	FileName string `json:"file_name" dynamodbav:"file_name"`
	Size     int64  `json:"size" dynamodbav:"size"`
}

var dynamoClient *dynamodb.Client

func InitDynamo() {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("us-east-1"),
	)
	if err != nil {
		log.Fatal(err)
	}

	dynamoClient = dynamodb.NewFromConfig(cfg, func(o *dynamodb.Options) {
		o.Retryer = aws.NopRetryer{}
	})
}

type ListFilesHandler struct{}

func (h ListFilesHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	out, err := dynamoClient.Scan(context.TODO(), &dynamodb.ScanInput{
		TableName: aws.String("files"),
	})
	if err != nil {
		http.Error(w, "failed to scan table", http.StatusInternalServerError)
		return
	}

	var items []FileItem
	err = attributevalue.UnmarshalListOfMaps(out.Items, &items)
	if err != nil {
		http.Error(w, "failed to parse items", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}
