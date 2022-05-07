import React from "react";
import Maze from "./Maze";
import Vertex from "./Vertex";
import {maze} from "../constructors";
import { useState, useEffect } from "react";
import { useMaze  } from "../hooks/useMaze";

export default function Game() {
  const [currentMaze, traverse, resetMaze] = useMaze();
  const [search, setSearch] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  const reset = () => {
    pauseIfOngoing();
    resetMaze();
  }

  const pauseIfOngoing = () => {
    if(intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return true;
    }
    return false;
  }

  const bfs = () => {
    if (pauseIfOngoing()) return;
    const interval = setInterval(() => {
      if(currentMaze.worklist.length > 0) {
        traverse();
      }
    }, .001);
    setIntervalId(interval);
  }

  return (
    <div>
      <Maze {...currentMaze} />
      <button type="button" onClick={reset}>New Maze</button>
      <button type="button" onClick={bfs}>{intervalId? "Pause" : "BFS"}</button>
    </div>)
}


