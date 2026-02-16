package repository

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"

	user "github.com/kubernetes-from-zero-to-production/lab-02/src/internal/user"
)

type DynamoUserRepository struct {
	tableName string
	client    *dynamodb.Client
}

func NewDynamoUserRepository(client *dynamodb.Client, table string) *DynamoUserRepository {
	return &DynamoUserRepository{
		client:    client,
		tableName: table,
	}
}

func (r *DynamoUserRepository) Create(ctx context.Context, user user.User) error {
	item, err := attributevalue.MarshalMap(user)
	if err != nil {
		return err
	}

	_, err = r.client.PutItem(ctx, &dynamodb.PutItemInput{
		TableName: &r.tableName,
		Item:      item,
	})
	return err
}

func (r *DynamoUserRepository) GetByID(ctx context.Context, id string) (*user.User, error) {
	out, err := r.client.GetItem(ctx, &dynamodb.GetItemInput{
		TableName: &r.tableName,
		Key: map[string]types.AttributeValue{
			"id": &types.AttributeValueMemberS{Value: id},
		},
	})
	if err != nil || out.Item == nil {
		return nil, err
	}

	var user user.User
	err = attributevalue.UnmarshalMap(out.Item, &user)
	return &user, err
}

func (r *DynamoUserRepository) Update(ctx context.Context, user user.User) error {
	item, err := attributevalue.MarshalMap(user)
	if err != nil {
		return err
	}

	_, err = r.client.PutItem(ctx, &dynamodb.PutItemInput{
		TableName: &r.tableName,
		Item:      item,
	})
	return err
}

func (r *DynamoUserRepository) Delete(ctx context.Context, id string) error {
	_, err := r.client.DeleteItem(ctx, &dynamodb.DeleteItemInput{
		TableName: &r.tableName,
		Key: map[string]types.AttributeValue{
			"id": &types.AttributeValueMemberS{Value: id},
		},
	})
	return err
}
