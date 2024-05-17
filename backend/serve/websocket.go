package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
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
	Gamers   = make(map[int]*Client)
	players  []Player
	mapBoard [][]int
	idplayer = 0
	seconds  = 20
)

type Client struct {
	conn *websocket.Conn
	send chan interface{}
	mu   sync.Mutex
}

type MessageStruct struct {
	Type    string                 `json:"type"`
	Content map[string]interface{} `json:"content"`
}
type RespMove struct {
	State string `json:"state"`
	Id    int    `json:"id"`
	Name  string `json:"pseudo"`
	Key   string `json:"key"`
	Text  string `json:"text"`
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
	client := &Client{
		conn: ws,
		send: make(chan interface{}),
	}
	defer ws.Close()

	go client.writePump()

	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
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
			if !firstTime {
				return
			}
			player := Player{Id: idplayer, Name: m.Content["pseudo"].(string)}
			players = append(players, player)
			Gamers[idplayer] = client
			idplayer++
			dataResp := map[string]interface{}{
				"id":   player.Id,
				"name": player.Name,
			}
			mapBoard = RenderMap()
			resp := Response{State: "join", Players: players, DataResp: dataResp, Map: mapBoard, MapBonus: mapBoard, Id: player.Id, Name: player.Name, Time: seconds}
			broadcast(resp)

			if len(Gamers) == 2 {
				startTimer()
			}
			seconds += 1
			if len(Gamers) == 4 {
				seconds = 10
				firstTime = false
			}

		case "move":
			resp := RespMove{State: "move", Id: int(m.Content["id"].(float64)), Name: m.Content["pseudo"].(string), Key: m.Content["key"].(string)}
			broadcast(resp)
		case "dead":
			var resp RespMove
			for id, _ := range Gamers {
				if id == int(m.Content["id"].(float64)) {
					delete(Gamers, id)
					resp = RespMove{State: "dead", Id: id, Name: m.Content["pseudo"].(string), Text: "Your Lose"}
				}
			}
			fmt.Println("Gamers = ", Gamers)
			if len(Gamers) == 1 {
				resp = RespMove{State: "dead", Id: int(m.Content["id"].(float64)), Name: m.Content["pseudo"].(string), Text: "Win"}
			}
			broadcast(resp)

		case "message":
			for _, gamer := range Gamers {
				response := Response{
					State: "message",
					DataResp: map[string]interface{}{
						"sender":  m.Content["sender"].(string),
						"message": m.Content["message"].(string),
					},
				}
				gamer.send <- response
			}
		}
	}
}

func (c *Client) writePump() {
	for {
		select {
		case message, ok := <-c.send:
			c.mu.Lock()
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				c.mu.Unlock()
				return
			}
			err := c.conn.WriteJSON(message)
			c.mu.Unlock()
			if err != nil {
				return
			}
		}
	}
}

func broadcast(resp interface{}) {
	for _, gamer := range Gamers {
		gamer.send <- resp
	}
}



var firstTime bool = true

func startTimer() {
	var CanStart = false
	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	for {
		if seconds == 0 {
			if firstTime {
				seconds = 11
				firstTime = false
			} else {
				CanStart = true
				resp := ResponseTime{State: "time", Time: seconds, CanStart: CanStart}
				broadcast(resp)
				break
			}
		}
		select {
		case <-ticker.C:
			seconds--
			resp := ResponseTime{State: "time", Time: seconds, CanStart: CanStart}
			broadcast(resp)

		}
	}
}
