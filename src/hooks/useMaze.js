import {useState, useCallback} from "react";
import {maze} from "../constructors";

//Helper
export function addNeighbors(vertex, visited, worklist) {
  vertex.outEdges.forEach(edge => {
    if(!visited.has(edge.first)) {
      worklist.push(edge.first);
    }
    if(!visited.has(edge.second)) {
      worklist.push(edge.second);
    }
  });
}

export const useMaze = () => {
  const [currentMaze, setMaze] = useState(maze(100,60));
  //const [visited, setVisited] = useState(currentMaze.visited);
  //const [worklist, setWorklist] = useState([currentMaze.start]);

  const traverse = () => {
    const worklist = currentMaze.worklist;
    const visited = currentMaze.visited;

    const size = currentMaze.worklist.length;

    for(let i = 0; i < size; i += 1) {
      const vertex = worklist.shift();
      if(!visited.has(vertex)) {
        visited.add(vertex);
        addNeighbors(vertex, visited, worklist);
      }
    }
    setMaze({...currentMaze, visited:visited, worklist:worklist});
    //for(let i = 0; i < size; i += 1) {
    //  const vertex = worklist[0];

    //  if(!visited.has(vertex)) {
    //    visited.add(vertex);
    //    vertex.outEdges.forEach(edge => {
    //      if(vertex !== edge.first && !visited.has(edge.first)) {
    //      worklist.push(edge.first);
    //      }
    //      if(vertex !== edge.second && !visited.has(edge.second)) {
    //      worklist.push(edge.second);
    //      }
    //    });
    //  }
    //}
  }

  const resetMaze = () => {
//    console.log('resetMaze.worklist.before');
//    console.log(worklist);

    setMaze(maze(100, 60));
//    setVisited(new Set());
//    setWorklist([newMaze.start]);
    //setWorklist([]);

//    console.log('resetMaze.worklist.after');
//    console.log(worklist);
//    console.log(newMaze.start);
  }

  return [currentMaze, traverse, resetMaze];
}
