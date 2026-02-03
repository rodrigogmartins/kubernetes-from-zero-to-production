package handlers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type UploadHandler struct {
	S3Client   *s3.Client
	BucketName string
}

func (h *UploadHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// limite de upload (10MB)
	r.Body = http.MaxBytesReader(w, r.Body, 10<<20)

	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "invalid multipart form", http.StatusBadRequest)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "file not found", http.StatusBadRequest)
		return
	}
	defer file.Close()

	key := fmt.Sprintf("%s", header.Filename)

	_, err = h.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: &h.BucketName,
		Key:    &key,
		Body:   file,
	})
	if err != nil {
		http.Error(w, "failed to upload to s3", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("upload successful"))
}
