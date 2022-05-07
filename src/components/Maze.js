import React from "react";
import { useState } from "react";

import Vertex from "./Vertex";

export default function Maze(props) {
  return (
    <div className="Maze">
      {props.vertices.map(vertex => (props.visited.has(vertex)) ? 
        <Vertex {...vertex} mode="Visited" key={props.width*vertex.y + vertex.x} /> :
        <Vertex {...vertex} mode=""  key={props.width*vertex.y + vertex.x} /> )}
    </div>
  )
}
