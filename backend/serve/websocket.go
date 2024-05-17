package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

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
	seconds  = 1
)

type MessageStruct struct {
	Type    string                 `json:"type"`
	Content map[string]interface{} `json:"content"`
}
type RespMove struct {
	State string `json:"state"`
	Id    int    `json:"id"`
	Name  string `json:"pseudo"`
	Key   string `json:"key"`
}
type Message struct {
	Id     int    `json:"id"`
	Pseudo string `json:"pseudo"`
	Time   int    `json:"time"`
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
	Name     string                 `json:"pseudo"`
	Time     int                    `json:"time"`
	MapBonus [][]int                `json:"mapBonus"`
}

type ResponseTime struct {
	State    string `json:"state"`
	Time     int    `json:"time"`
	CanStart bool   `json:"start"`
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
			fmt.Println(err)
			return
		}

		switch m.Type {
		case "login":
			// Gérer le login du joueur
			if !firstTime {
				fmt.Println("Cannot join")
				return
			}
			player := Player{Id: idplayer, Name: m.Content["pseudo"].(string)}
			players = append(players, player)
			Gamers[idplayer] = ws
			idplayer++
			dataResp := map[string]interface{}{
				"id":   player.Id,
				"name": player.Name,
			}
			mapBoard = RenderMap()
			// resp := Response{State: "join", Players: players, DataResp: dataResp, Map: mapBoard, MapBonus: mapBoard}

			resp := Response{State: "join", Players: players, DataResp: dataResp, Map: mapBoard, MapBonus: mapBoard, Id: player.Id, Name: player.Name, Time: seconds}
			broadcast(resp, Gamers)

			if len(Gamers) == 2 {
				startTimer(Gamers)
			}
			seconds += 1
			if len(Gamers) == 4 {
				seconds = 10
				firstTime = false
			}
			// case "time":
			// 	go startTimer()
			// 	// Gérer le temps
			// 	resp := ResponseTime{State: "time", Time: seconds}
			// 	fmt.Println("Temps dans reponse ", seconds)
			// 	if err := ws.WriteJSON(resp); err != nil {
			// 		// Gérer l'erreur d'écriture et nettoyer la connexion
			// 		// delete(Gamers, idplayer)
			// 		return
			// 	}
		case "move":
			resp := RespMove{State: "move", Id: int(m.Content["id"].(float64)), Name: m.Content["pseudo"].(string), Key: m.Content["key"].(string)}
			broadcast(resp, Gamers)
			// fmt.Println(resp)

		case "dead":
			resp := RespMove{State: "dead", Id: int(m.Content["id"].(float64)), Name: m.Content["pseudo"].(string)}
			fmt.Println(resp)
			broadcast(resp, Gamers)

		case "message":
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

var firstTime bool = true

func startTimer(gamers map[int]*websocket.Conn) {
	var CanStart = false
	// Créez un canal pour recevoir des signaux chaque seconde
	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	// Compteur pour suivre le nombre de secondes écoulées

	for {
		if seconds == 0 {
			if firstTime {
				seconds = 10
				firstTime = false
			} else {
				CanStart = true
				resp := ResponseTime{State: "time", Time: seconds, CanStart: CanStart}
				broadcast(resp, gamers)
				break
			}
		}
		select {
		case <-ticker.C:
			seconds--
			fmt.Printf("Temps écoulé : %d seconde(s)\n", seconds)
			fmt.Println("-----------------------------", len(gamers))
			resp := ResponseTime{State: "time", Time: seconds, CanStart: CanStart}
			broadcast(resp, gamers)

		}
	}
}

// func startTimer() {
//     ticker := time.NewTicker(time.Second)
//     defer ticker.Stop()

//     for {
// 		if seconds == 0 {
// 			break
// 		}
//         select {
//         case <-ticker.C:
//             seconds-- // Assurez-vous que ceci est correct selon votre logique de décompte
//             fmt.Printf("Temps écoulé : %d seconde(s)\n", seconds)

//             // Envoyez le temps restant à tous les clients
//             resp := ResponseTime{State: "time", Time: seconds}
//             broadcast(resp)
//         }
//     }
// }

// func sendRemainingTime() {
//     // Créez un objet contenant le temps restant
//     resp := ResponseTime{State: "time", Time: seconds}

//     // Utilisez la fonction broadcast pour envoyer le message à tous les clients
//     broadcast(resp)
// }
