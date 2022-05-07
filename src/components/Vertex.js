export default function RenderVertex(props) {
  let upwall = "HorizontalWall";
  let leftwall = "VerticalWall";
  let rightwall = "VerticalWall";
  let downwall = "HorizontalWall";
  if(props.up != null) {
    upwall += " Open " + props.mode;
  }
  if(props.left != null) {
    leftwall += " Open "+ props.mode;
  }
  if(props.right != null) {
    rightwall += " Open "+ props.mode;
  }
  if(props.down != null) {
    downwall += " Open "+ props.mode;
  }

  //Style
  return (
    <div className="Node">
      <div className="Corner"></div>
      <div className={upwall}></div>
      <div className="Corner"></div>
      <div className={leftwall}></div>
      <div className={"Vertex " + props.mode}></div>
      <div className={rightwall}></div>
      <div className="Corner"></div>
      <div className={downwall}></div>
      <div className="Corner"></div>
    </div>
  )
}
