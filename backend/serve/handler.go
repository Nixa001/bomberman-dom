package server

import "net/http"

func StartServer() {
	http.HandleFunc("/ws", handleConnections)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic("Erreur lors du démarrage du serveur: " + err.Error())
	}
}
