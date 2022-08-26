import React from "react";
import { getBezierPath } from "react-flow-renderer";

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
  const edgePath = getBezierPath({
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
          {data.hostPort}
        </textPath>
        <textPath
          href={`#${id}`}
          style={textPathStyles}
          startOffset="85%"
          textAnchor="middle"
        >
          {data.containerPort}
        </textPath>
      </text>
    </>
  );
};

export default HostEdge;
