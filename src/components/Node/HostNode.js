import { Handle, Position } from "react-flow-renderer";
import ComputerIcon from "@mui/icons-material/Computer";
import "../styles/container-node.css";
import { Tooltip, Typography, Zoom } from "@mui/material";
import { Fragment } from "react";

function HostNode({ data, selected, dragging }) {
  return (
    <Tooltip
      title={
        <Fragment>
          <Typography color="inherit">Local Host</Typography>
          This is the node of the host machine.
        </Fragment>
      }
      arrow
      disableHoverListener
      // Open tooltip only when not being dragged
      open={selected && !dragging}
      TransitionComponent={Zoom}
      enterNextDelay={1000}
    >
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
    </Tooltip>
  );
}

export default HostNode;
