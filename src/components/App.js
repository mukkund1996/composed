import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  MiniMap,
  Controls,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "react-flow-renderer";
import Button from "@mui/material/Button";

// Entities
import ContainerNode from "./ContainerNode.js";
import HostNode from "./HostNode.js";
import PortEdge from "./PortEdge.js";
import initialNodes from "./InitialNodes.js";
// UI promps
import NodeCreatePrompt from "./NodeCreatePrompt.js";
import EdgeCreatePrompt from "./EdgeCreatePrompt.js";

import "./button.css";
import init, { print_string } from "wasm-parser";

const edgeOptions = {
  animated: false,
  style: {
    stroke: "black",
  },
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

  // Entity States
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [openNodePrompt, setOpenNodePrompt] = useState(false);
  const [openEdgePrompt, setOpenEdgePrompt] = useState(false);
  const [portSettings, setPortSettings] = useState({
    containerPort: "",
    hostPort: "",
  });
  const [hostEdge, setHostEdge] = useState(null);

  // Dialog hooks
  const handleCloseNodeDialog = () => {
    setOpenNodePrompt(false);
  };
  const handleCloseEdgeDialog = () => {
    setOpenEdgePrompt(false);
  };
  const onClickOpenNodeDialog = () => {
    setOpenNodePrompt(true);
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
  }, [reactFlowInstance]);

  const onClickUpdateHostEdge = useCallback((conPort, hPort) => {
    setPortSettings({
      containerPort: conPort,
      hostPort: hPort,
    });
  });

  const onClickAddHostEdge = useEffect(() => {
    if (hostEdge){
      setEdges((eds) => addEdge(
        {type: "portEdge", data: portSettings, ...hostEdge},
        eds
      ));
    }
  }, [portSettings]);

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
        // Setting the ports if connected to local host
        if (params.source === "localhost" || params.target === "localhost") {
          setOpenEdgePrompt(true);
          setHostEdge(params);
          return eds;
        } else {
          return addEdge(params, eds);
        }
      });
    },
    [setEdges]
  );

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
        onClick={onClickOpenNodeDialog}
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
        open={openNodePrompt}
        setValue={onClickAddNode}
        handleClose={handleCloseNodeDialog}
      />
      <EdgeCreatePrompt
        open={openEdgePrompt}
        setValue={onClickUpdateHostEdge}
        handleClose={handleCloseEdgeDialog}
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
