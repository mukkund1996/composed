import { Handle, Position } from "react-flow-renderer";
import ComputerIcon from '@mui/icons-material/Computer';
import "./container-node.css";

function HostNode({ data }) {
  return (
    <div className="container-node">
      <Handle type="target" position={Position.Top} id="a" />
      <div>
        <ComputerIcon fontSize="large" />
        <label htmlFor="text">Host</label>
      </div>
      <Handle type="target" position={Position.Left} id="c" />
      <Handle type="target" position={Position.Right} id="d" />
      <Handle type="target" position={Position.Bottom} id="b" />
    </div>
  );
}

export default HostNode;
