import { Tooltip, Typography, Zoom } from "@mui/material";
import { Fragment } from "react";
import { Handle, Position } from "react-flow-renderer";
import { targetHandleStyling, sourceHandleStyling } from "../styles/Styles";
import "../styles/container-node.css";

function ContainerNode({ data, selected, dragging }) {
  return (
    <Tooltip
      title={
        <Fragment>
          <Typography color="inherit">
            Service Name: {data.serviceName}
          </Typography>
          <b>{"Image: "}</b> {data.label}
          <br />
          <b>{"Container Volume: "}</b>{" "}
          {data.volumes.length ? data.volumes[0].container : "Not Specified"}
          <br />
          <b>{"Host Volume: "}</b>{" "}
          {data.volumes.length ? data.volumes[0].host : "Not Specified"}
          <br />
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
        <Handle type="source" style={sourceHandleStyling} position={Position.Top} id="a" />
        <Handle type="source" style={sourceHandleStyling} position={Position.Left} id="b" />
        <div>
          <label htmlFor="text">{data.serviceName}</label>
        </div>
        <Handle type="target" style={targetHandleStyling} position={Position.Bottom} id="c" />
        <Handle type="target" style={targetHandleStyling} position={Position.Right} id="d" />
      </div>
    </Tooltip>
  );
}

export default ContainerNode;
