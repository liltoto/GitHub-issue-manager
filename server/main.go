package main

import (
	"net/http"
	"os"
)

func checkPort() string {
	port := os.Getenv("PORT")
	if port != "" {
		return ":" + port
	}
	return ":8080"
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./web")))
	http.ListenAndServe(checkPort(), nil)
}
