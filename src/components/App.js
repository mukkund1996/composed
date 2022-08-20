import { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "react-flow-renderer";
import ContainerNode from "./ContainerNode.js";
import initialNodes from "./InitialNodes.js";
import initialEdges from "./InitialEdges.js";

import "./button.css";
import init, { print_string } from "wasm-parser";

const edgeOptions = {
  animated: true,
  style: {
    stroke: "white",
  },
};

const nodeTypes = { containerNode: ContainerNode };

let nodeId = 0;

function preprocessNode(obj) {
  let moddedNode = {};
  Object.keys(obj).forEach((key) => {
    if (key === "type") {
      moddedNode["nodeType"] = obj[key];
    } else {
      moddedNode[key] = obj[key];
    }
  });
  return moddedNode;
}

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const reactFlowInstance = useReactFlow();
  const addNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
      type: "containerNode",
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const onClickRemoveNode = (event) => {
    const selectedNode = nodes.filter((nd) => nd.selected);
    if (selectedNode.length !== 0) {
      setNodes((nds) => nds.filter((val) => val.id !== selectedNode.id[0]));
    }
  };

  const onClickSubmit = (_) => {
    const mod_nodes = nodes.map((nd) => preprocessNode(nd));
    const stringified = JSON.stringify(mod_nodes);
    init().then(() => {
      const rusty_str = print_string(stringified);
      console.log(rusty_str);
    });
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={edgeOptions}
        fitView
        style={{
          backgroundColor: "#D3D2E5",
        }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
      <Background />
      <button onClick={addNode} className="btn-add">
        Add node
      </button>
      <button onClick={onClickRemoveNode} className="btn-remove">
        Remove node
      </button>
      <button onClick={onClickSubmit} className="btn-submit">
        Compose
      </button>
    </>
  );
}

export default function () {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
