package handlers

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type ListHandler struct {
	S3Client   *s3.Client
	BucketName string
}

func (h *ListHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	resp, err := h.S3Client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String(h.BucketName),
	})
	if err != nil {
		log.Printf("failed to list objects: %v", err)
		http.Error(w, "failed to list files", http.StatusInternalServerError)
		return
	}

	for _, obj := range resp.Contents {
		fmt.Fprintln(w, *obj.Key)
	}
}
