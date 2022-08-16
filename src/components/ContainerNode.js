import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import "./container-node.css";

function ContainerNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="container-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Container</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default ContainerNode;