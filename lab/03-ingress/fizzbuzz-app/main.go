package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type GreetingResponse struct {
	Message string `json:"message"`
}

func greetingsHandler(w http.ResponseWriter, r *http.Request) {
	response := GreetingResponse{
		Message: "BUZZ!",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", greetingsHandler)
	http.HandleFunc("/fizz", greetingsHandler)

	log.Println("Server running on http://localhost:3000")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}
}
