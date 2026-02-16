package user

type User struct {
	ID    string `json:"id"    dynamodbav:"id"    binding:"required"`
	Name  string `json:"name"  dynamodbav:"name"  binding:"required"`
	Email string `json:"email" dynamodbav:"email" binding:"required"`
}
