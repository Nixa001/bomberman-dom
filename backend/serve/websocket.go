package server

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Permet toutes les origines, mais en production, vous devriez vérifier l'origine.
	},
}

type MessageStruct struct {
	Type    string `json:"type"`
	Content string `json:"content"`
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Impossible de mettre à niveau la connexion", http.StatusInternalServerError)
		return
	}
	defer ws.Close()
	for {
		// Lit un message du client.
		_, msg, err := ws.ReadMessage()
		if err != nil {
			// Gère l'erreur de lecture.
			return
		}
		var m MessageStruct
		err = json.Unmarshal(msg, &m)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println("msg", m)
		var data = map[string]string{
			"connection": "test",
			"message": "test",
		}
		if err := ws.WriteJSON(data); err != nil {
			break
		}
	}
}

func StartServer() {
	http.HandleFunc("/ws", handleConnections)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic("Erreur lors du démarrage du serveur: " + err.Error())
	}
}
