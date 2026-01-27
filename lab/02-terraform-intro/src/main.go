package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"

	"github.com/kubernetes-from-zero-to-production/lab-02/src/internal/api"
	"github.com/kubernetes-from-zero-to-production/lab-02/src/internal/repository"
	"github.com/kubernetes-from-zero-to-production/lab-02/src/internal/user"
)

const (
	app_port  string = "3000"
	tablename string = "users"
)

func main() {
	ctx := context.Background()

	region := os.Getenv("AWS_REGION")

	cfg, err := config.LoadDefaultConfig(ctx,
		config.WithRegion(region),
	)
	if err != nil {
		log.Fatal(err)
	}

	dynamoClient := dynamodb.NewFromConfig(cfg, func(o *dynamodb.Options) {
		o.Retryer = aws.NopRetryer{}
	})

	userRepo := repository.NewDynamoUserRepository(
		dynamoClient,
		tablename,
	)

	userService := user.NewUserService(userRepo)

	userHandler := api.NewUserHandler(userService)

	router := gin.New()

	router.Use(
		gin.Logger(),
		gin.Recovery(),
	)

	userHandler.Register(router)

	srv := &http.Server{
		Addr:         ":" + app_port,
		Handler:      router,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("API running on port %s", app_port)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
