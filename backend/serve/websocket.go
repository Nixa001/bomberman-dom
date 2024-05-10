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

var Gamers []websocket.Conn

type MessageStruct struct {
	Type    string  `json:"type"`
	Content Message `json:"content"`
}
type Message struct {
	Id     int    `json:"id"`
	Pseudo string `json:"pseudo"`
}
type Player struct {
	Id   int    `json:"id"`
	Name string `json:"pseudo"`
	X    string `json:"x"`
	Y    string `json:"y"`
}

var players []Player

type Response struct {
	State    string                 `json:"state"`
	Players  []Player               `json:"players"`
	DataResp map[string]interface{} `json:"dataResp"`
}

var idplayer = 0

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
		if m.Type == "login" {
			var player Player
			player.Id = idplayer
			player.Name = m.Content.Pseudo
			fmt.Println("Player", player)
			idplayer++
			dataResp := map[string]interface{}{
				"id":   player.Id,
				"name": player.Name,
			}
			players = append(players, player)
			resp := Response{State: "join", Players: players, DataResp: dataResp}
			if err := ws.WriteJSON(resp); err != nil {
				break
			}
		}
	}
}
