package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type FileItem struct {
	ID       string `json:"id" dynamodbav:"id"`
	FileName string `json:"file_name" dynamodbav:"file_name"`
	Size     int64  `json:"size" dynamodbav:"size"`
}

type ListFilesHandler struct {
	DynamoClient *dynamodb.Client
	TableName    string
}

func (h ListFilesHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	out, err := h.DynamoClient.Scan(context.TODO(), &dynamodb.ScanInput{
		TableName: aws.String(h.TableName),
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
