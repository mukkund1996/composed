import React from "react";
import { getSmoothStepPath } from "react-flow-renderer";

const textPathStyles = {
  fontSize: "7px",
  fontWeight: "bold",
};

const HostEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={textPathStyles}
          startOffset="15%"
          textAnchor="top"
        >
          {data.containerPort}
        </textPath>
        <textPath
          href={`#${id}`}
          style={textPathStyles}
          startOffset="85%"
          textAnchor="middle"
        >
          {data.hostPort}
        </textPath>
      </text>
    </>
  );
};

export default HostEdge;
