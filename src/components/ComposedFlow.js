import { useCallback, useEffect, useState, forwardRef } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "react-flow-renderer";

// MUI Components
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Entities
import ContainerNode from "./ContainerNode.js";
import HostNode from "./HostNode.js";
import HostEdge from "./HostEdge.js";
import initialNodes from "./InitialNodes.js";
// UI promps
import NodeCreatePrompt from "./NodeCreatePrompt.js";
import HostEdgeCreatePrompt from "./HostEdgeCreatePrompt.js";

import "./button.css";
import init, { print_string } from "wasm-parser";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const edgeOptions = {
  animated: false,
  style: {
    stroke: "black",
  },
};

const nodeTypes = { containerNode: ContainerNode, hostNode: HostNode };
const edgeTypes = { portEdge: HostEdge };

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

const ComposedFlow = () => {
  const reactFlowInstance = useReactFlow();

  // App States
  const [errorMessage, setErrorMessage] = useState("");
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

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

  const onClickAddNode = useCallback(
    (containerName, serviceName) => {
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
    },
    [reactFlowInstance]
  );

  const onClickUpdateHostEdge = useCallback((conPort, hPort) => {
    setPortSettings({
      containerPort: conPort,
      hostPort: hPort,
    });
  });

  const onClickAddHostEdge = useEffect(() => {
    if (hostEdge) {
      setEdges((eds) =>
        addEdge({ type: "portEdge", data: portSettings, ...hostEdge }, eds)
      );
    }
  }, [portSettings]);

  // Snackbar hooks
  const handleCloseErrorMessage = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorMessage(false);
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
        // Setting the ports if connected to local host
        if (params.source === "localhost" || params.target === "localhost") {
          setOpenEdgePrompt(true);
          setHostEdge(params);
          return eds;
        } else {
          // In the case of edges between 2 containers
          params['animated'] = true;
          const modEdge = {
            type: 'smoothstep',
            animated: true,
            label: "depends on",
            labelStyle: { fill: 'blue', fontWeight: 500 },
            ...params,
          };

          return addEdge(modEdge, eds);
        }
      });
    },
    [setEdges]
  );

  const onClickRemoveNode = (_) => {
    const selectedNode = nodes.filter((nd) => nd.selected);
    if (selectedNode.length !== 0) {
      if (selectedNode[0]?.type === "hostNode") {
        setErrorMessage("Host node cannot be deleted!");
        setOpenErrorMessage(true);
      } else {
        setNodes((nds) => nds.filter((val) => val.id !== selectedNode[0].id));
      }
    } else {
      setErrorMessage("Node must be selected first to be deleted");
      setOpenErrorMessage(true);
    }
  };

  const onClickSubmit = (_) => {
    const modNodes = nodes.map((nd) => preprocessNode(nd));
    const stringifiedNodes = JSON.stringify(modNodes);
    const stringifiedEdges = JSON.stringify(edges);
    init().then(() => {
      const rusty_str = print_string(stringifiedNodes, stringifiedEdges);
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
          backgroundColor: "#FFFFFF",
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
      <HostEdgeCreatePrompt
        open={openEdgePrompt}
        setValue={onClickUpdateHostEdge}
        handleClose={handleCloseEdgeDialog}
      />
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={4000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseErrorMessage}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ComposedFlow;
