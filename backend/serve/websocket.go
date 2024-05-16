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

var (
	Gamers   = make(map[int]*websocket.Conn)
	players  []Player
	mapBoard [][]int
	idplayer = 0
	seconds  = 20
)

type MessageStruct struct {
	Type    string                 `json:"type"`
	Content map[string]interface{} `json:"content"`
}

type Player struct {
	Id   int    `json:"id"`
	Name string `json:"pseudo"`
	X    string `json:"x"`
	Y    string `json:"y"`
	Live int    `json:"live"`
}

type Response struct {
	State    string                 `json:"state"`
	Players  []Player               `json:"players"`
	DataResp map[string]interface{} `json:"dataResp"`
	Map      [][]int                `json:"map"`
	Id       int                    `json:"id"`
	Time     int                    `json:"time"`
}

type ResponseTime struct {
	State string `json:"state"`
	Time  int    `json:"time"`
}

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
			// Gérer l'erreur de lecture et nettoyer la connexion
			delete(Gamers, idplayer)
			return
		}
		var m MessageStruct
		err = json.Unmarshal(msg, &m)
		if err != nil {
			fmt.Println("something", err)
		}

		if Gamers == nil {
			Gamers = make(map[int]*websocket.Conn)
		}
		//Traitement du login
		if m.Type == "login" {
			Gamers[idplayer] = ws
			var player Player
			player.Id = idplayer
			player.Name = m.Content["pseudo"].(string)
			dataResp := map[string]interface{}{
				"id":   player.Id,
				"name": player.Name,
			}
			players = append(players, player)
			idplayer++
			fmt.Println("map = ", mapBoard)
			mapBoard = RenderMap()
			resp := Response{State: "join", Players: players, DataResp: dataResp, Map: mapBoard, Id: player.Id, Time: seconds}
			broadcast(resp, Gamers)
		}
		if len(Gamers) == 2 {
			startTimer(Gamers)
		}
		//Traitement du message
		if m.Type == "message" {
			for _, gamer := range Gamers {
				response := Response{
					State: "message",
					DataResp: map[string]interface{}{
						"sender":  m.Content["sender"].(string),
						"message": m.Content["message"].(string),
					},
				}
				if err := gamer.WriteJSON(response); err != nil {
					return
				}
			}
		}
	}

}

func broadcast(resp interface{}, gamers map[int]*websocket.Conn) {
	for _, gamer := range gamers {

		if err := gamer.WriteJSON(resp); err != nil {
			// Gérer l'erreur d'écriture et nettoyer les connexions
			// delete(Gamers, idplayer)
			return
		}

	}
}

func startTimer(gamers map[int]*websocket.Conn) {
	// No need to create a ticker if you're not using it to receive values
	// ticker := time.NewTicker(time.Second)
	// defer ticker.Stop()

	// Directly decrement seconds in each iteration
	for {
		if seconds == 0 {
			break
		}
		seconds--

		fmt.Printf("Temps écoulé : %d seconde(s)\n", seconds)
		fmt.Println("-----------------------------", len(gamers))
		resp := ResponseTime{State: "time", Time: seconds}
		broadcast(resp, gamers)
	}
}

// func startTimer(gamers map[int]*websocket.Conn) {

// 	// Créez un canal pour recevoir des signaux chaque seconde
// 	ticker := time.NewTicker(time.Second)
// 	defer ticker.Stop()

// 	// Compteur pour suivre le nombre de secondes écoulées

// 	for {
// 		if seconds == 0 {
// 			// seconds = 0
// 			break
// 		}
// 		select {
// 		case <-ticker.C:
// 			seconds--
// 			fmt.Printf("Temps écoulé : %d seconde(s)\n", seconds)
// 			fmt.Println("-----------------------------", len(gamers))
// 			resp := ResponseTime{State: "time", Time: seconds}
// 			broadcast(resp, gamers)

// 		}
// 	}
// }
