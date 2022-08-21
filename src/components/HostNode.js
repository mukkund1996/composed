import { Handle, Position } from "react-flow-renderer";
import ComputerIcon from '@mui/icons-material/Computer';
import "./container-node.css";

function HostNode({ data }) {
  return (
    <div className="container-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <ComputerIcon fontSize="large" />
        <label htmlFor="text">Host</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default HostNode;
