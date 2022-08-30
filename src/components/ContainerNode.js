import { Handle, Position } from "react-flow-renderer";
import "./container-node.css";

function ContainerNode({ data }) {

  return (
    <div className="container-node">
      <Handle 
      type="source"
      position={Position.Top}
      id="a"
      />
      <Handle 
      type="source"
      position={Position.Left} 
      id="b"
      />
      <div>
        <label htmlFor="text">{data.label}</label>
      </div>
      <Handle 
      type="target"
      position={Position.Bottom} 
      id="c"
      />
      <Handle 
      type="target"
      position={Position.Right} 
      id="d"
      />
    </div>
  );
}

export default ContainerNode;
