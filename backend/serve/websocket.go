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
		return true
	},
}

var Gamers map[int]*websocket.Conn

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
	Live int    `json:"live"`
}

var players []Player

type Response struct {
	State    string                 `json:"state"`
	Players  []Player               `json:"players"`
	DataResp map[string]interface{} `json:"dataResp"`
	Map      [][]int                `json:"map"`
	MapBonus [][]int                `json:"mapBonus"`
}

// var mapBoard [][]int

var mapBoard = RenderMap()
var idplayer = 0

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Impossible de mettre à niveau la connexion", http.StatusInternalServerError)
		return
	}
	defer ws.Close()

	for {
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

		if Gamers == nil {
			Gamers = make(map[int]*websocket.Conn)
		}
		if m.Type == "login" {

			Gamers[idplayer] = ws
			var player Player
			player.Id = idplayer
			player.Name = m.Content.Pseudo
			idplayer++
			dataResp := map[string]interface{}{
				"id":   player.Id,
				"name": player.Name,
			}
			players = append(players, player)
			fmt.Println("Player", players)

			resp := Response{State: "join", Players: players, DataResp: dataResp, Map: mapBoard, MapBonus: mapBoard}
			for _, gamer := range Gamers {
				// if err := gamer.WriteMessage(){}
				if err := gamer.WriteJSON(resp); err != nil {
					break
				}

			}
		}
	}
}
