package api

import (
	"net/http"

	user "github.com/kubernetes-from-zero-to-production/lab-02/src/internal/user"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service *user.UserService
}

func NewUserHandler(s *user.UserService) *UserHandler {
	return &UserHandler{service: s}
}

func (h *UserHandler) Register(r *gin.Engine) {
	r.POST("/users", h.create)
	r.GET("/users/:id", h.get)
	r.PUT("/users/:id", h.update)
	r.DELETE("/users/:id", h.delete)
}

func (h *UserHandler) create(c *gin.Context) {
	var user user.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.service.Create(c, user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusCreated)
}

func (h *UserHandler) get(c *gin.Context) {
	user, err := h.service.Get(c, c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) update(c *gin.Context) {
	var user user.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user.ID = c.Param("id")
	h.service.Update(c, user)
	c.Status(http.StatusOK)
}

func (h *UserHandler) delete(c *gin.Context) {
	h.service.Delete(c, c.Param("id"))
	c.Status(http.StatusNoContent)
}
