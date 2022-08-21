import React from 'react';
import { getBezierPath } from 'react-flow-renderer';

const textPathStyles = { 
    fontSize: '10px', 
    fontWeight: 'bold',
  }

const PortEdge = ({
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
}

export default PortEdge;