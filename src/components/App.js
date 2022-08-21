import { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  Controls,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType
} from "react-flow-renderer";
import Button from "@mui/material/Button";

// Entities
import ContainerNode from "./ContainerNode.js";
import HostNode from "./HostNode.js";
import PortEdge from "./PortEdge.js";
import initialNodes from "./InitialNodes.js";
// UI promps
import NodeCreatePrompt from "./NodeCreatePrompt.js";

import "./button.css";
import init, { print_string } from "wasm-parser";

const edgeOptions = {
  animated: false,
  style: {
    stroke: "black",
  }
};

const nodeTypes = { containerNode: ContainerNode, hostNode: HostNode };
const edgeTypes = { portEdge: PortEdge };

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
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [open, setOpen] = useState(false);

  // Dialog hooks
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // React Flow hooks
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        if (params.source === "localhost" || params.target === "localhost") {
          params["type"] = "portEdge";
          params["data"] = {
            containerPort: "9000",
            hostPort: "9000"
          }
        }
        return addEdge(params, eds);
      });
    },
    [setEdges]
  );

  const onClickOpenDialog = () => {
    setOpen(true);
  };

  const onClickAddNode = useCallback((containerName, serviceName) => {
    const id = containerName;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: serviceName,
      },
      type: "containerNode",
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const onClickRemoveNode = (_) => {
    const selectedNode = nodes.filter((nd) => nd.selected);
    if (selectedNode.length !== 0) {
      setNodes((nds) => nds.filter((val) => val.id !== selectedNode[0].id));
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
        snapToGrid={true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
      <MiniMap />
      <Controls />
      <Background />
      <Button
        variant="contained"
        className="btn-add"
        onClick={onClickOpenDialog}
      >
        Add Node
      </Button>
      <Button
        variant="contained"
        className="btn-add"
        onClick={onClickRemoveNode}
      >
        Remove Node
      </Button>
      <Button variant="contained" className="btn-add" onClick={onClickSubmit}>
        Compose
      </Button>
      <NodeCreatePrompt
        open={open}
        setValue={onClickAddNode}
        handleClose={handleCloseDialog}
      />
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
