import {heap, insert, remove } from "./heap";
import {addNeighbors} from "./hooks/useMaze";

//Represents a vertex
function vertex(x, y) {
  return {
    x:x,
    y:y,
    up:null,
    left:null,
    right:null,
    down:null,
    outEdges:[],
  }
}

//Add edge to a vertex in specific direction;
function addEdgeToVertex(vertex, dir, edge) {
  if(dir === "up") {
    vertex.up = edge;
  }
  else if(dir === "left") {
    vertex.left = edge;
  }
  else if(dir === "right") {
    vertex.right = edge;
  }
  else if(dir === "down") {
    vertex.down = edge;
  }
  else {
  }
  vertex.outEdges.push(edge);
}
//Add an edge to its corresponding vertices
function addEdge(edge) {
  const first = edge.first;
  const second = edge.second;
  if(edge.vertical) {
    addEdgeToVertex(first, "up", edge);
    addEdgeToVertex(second, "down", edge);
  }
  else {
    addEdgeToVertex(first, "left", edge);
    addEdgeToVertex(second, "right", edge);
  }
}

//Represents an edge
function edge(first, second, weight, vertical) {
  return {
    first:first,
    second:second,
    weight:weight,
    vertical:vertical
  }
}

//Compares two edges: negative if first is less than second
//0 if equal, positive if greater than
function edgeCompare(first, second) {
  return first.weight - second.weight;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function maze(width, height) {
  const edges = new heap(edgeCompare);
  const vertices = [];
  const unionFind = new Map();
  const tree = new Set();

  let start, end;

  for(let row = 0; row < height; row += 1) {
    for(let col = 0; col < width; col += 1) {
      const current = vertex(col, row);

      if(row > 0) {
        const edgeWeight = getRandomInt(100);
        const horEdge = edge(current, vertices[width * (row - 1) + col], edgeWeight, true);
        insert(edges, horEdge);
      }

      if(col > 0) {
        const edgeWeight = getRandomInt(100);
        const verEdge = edge(current, vertices[width * row + col - 1], edgeWeight, false);
        insert(edges, verEdge);
      }

      //set start and end
      if(row === 0 && col === 0) {
        start = current;
      }
      if(row === height-1 && col === width - 1) {
        end = current;
      }

      //set unionfind structure
      unionFind.set(current, current);
      vertices.push(current);
    }
  }

  while(tree.size < vertices.length-1) {
    const removed = remove(edges);
    reassign(removed, unionFind, tree);
  }

  const worklist = [];
  const visited = new Set();
  worklist.push(start);

  const cameFrom = new Map();
  while(worklist.size > 0) {
    const next = worklist.shift();
    if(next === end) {
      worklist.clear(); 
    }
    else if(!visited.has(next)) {
      next.outEdges.forEach(edge => {
        if(!visited.has(edge.first)) {
          worklist.push(edge.first);
          cameFrom.set(edge.first, edge);
        }
        if(!visited.has(edge.second)) {
          worklist.push(edge.second);
          cameFrom.set(edge.second, edge);
        }
      });
    }
  }

  return {
    width:width,
    height:height,
    vertices:vertices,
    visited:visited,
    worklist:worklist,
    tree:tree,
    start:start,
    end:end
  }
}

//Kruskal's blobbing
function reassign(edge, union, tree) {
  let left = edge.first;
  let right = edge.second;

  while (union.get(left) !== left) {
    left = union.get(left);
  }

  while (union.get(right) !== right) {
    right = union.get(right);
  }

  if(left !== right) {
    union.set(left, right);
    addEdge(edge);
    tree.add(edge);
  }
}
