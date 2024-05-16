package server

import (
	"fmt"
	"math/rand"
	"time"
)

const (
	CELL_SIZE = 20
	MAP_SIZEX = 16
	MAP_SIZEY = 10
)

var mapInit = [][]int{
	{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
	{0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0},
	{0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0},
	{0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 0},
	{0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0},
	{0, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 0},
	{0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0},
	{0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 0},
	{0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0},
	{0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 0},
	{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
}

func RenderMap() [][]int {
	mapBoard := mapInit
	for i := 0; i < len(mapBoard); i++ {
		for j := 0; j < len(mapBoard[1]); j++ {
			if mapBoard[i][j] == 1 {
				if rand.Float64() < 0.7 {
					if rand.Float64() < 1 {
						mapBoard[i][j] = getRandomNumber()
					} else {
						mapBoard[i][j] = 1
					}
				} else {
					mapBoard[i][j] = 2
				}
			}
		}
		fmt.Println(mapBoard[i])
	}
	return mapBoard
}
func getRandomNumber() int {
	rand.Seed(time.Now().UnixNano())
	return rand.Intn(3) + 3
}
