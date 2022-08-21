import { Handle, Position } from "react-flow-renderer";
import "./container-node.css";

function ContainerNode({ data }) {
  return (
    <div className="container-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">{data.label}</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default ContainerNode;
