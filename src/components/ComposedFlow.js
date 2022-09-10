import { useCallback, useEffect, useState, forwardRef, useMemo } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

// MUI Components
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Entities
import ContainerNode from "./Node/ContainerNode.js";
import HostNode from "./Node/HostNode.js";
import HostEdge from "./Edge/HostEdge.js";
import initialNodes from "./Node/InitialNodes.js";

// UI promps
import NodeCreatePrompt from "./Node/NodeCreatePrompt.js";
import HostEdgeCreatePrompt from "./Edge/HostEdgeCreatePrompt.js";
import ComposePrompt from "./ComposePrompt/ComposePrompt.js";
import CustomControl from "./Controls/CustomControl.js";

// WASM modules
import init, { print_string } from "wasm-parser";

// CSS
import "./styles/flow-styles.css";
import "./styles/prompt-styles.css";

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
  const setAndOpenErrorSnackbar = (message) => {
    setErrorMessage(message);
    setOpenErrorMessage(true);
  };

  // Entity States
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [composeContent, setComposeContent] = useState("");
  const [openNodePrompt, setOpenNodePrompt] = useState(false);
  const [openEdgePrompt, setOpenEdgePrompt] = useState(false);
  const [openComposePrompt, setOpenComposePrompt] = useState(false);
  const [portSettings, setPortSettings] = useState({
    hostPort: "",
    containerPort: "",
  });
  const [hostEdge, setHostEdge] = useState(null);
  const [openNodeToolTip, setOpenNodeToolTip] = useState(false);

  // Dialog hooks
  const handleCloseNodeDialog = () => {
    setOpenNodePrompt(false);
  };
  const handleCloseEdgeDialog = () => {
    setOpenEdgePrompt(false);
  };
  const handleCloseComposeDialog = () => {
    setOpenComposePrompt(false);
  };
  const onClickOpenNodeDialog = () => {
    setOpenNodePrompt(true);
  };

  const onClickAddNode = useCallback(
    (imageName, serviceName, hostVolume, containerVolume) => {
      const foundService = nodes.map((n) => n.id).find((v) => v === serviceName);
      if (foundService) {
        setAndOpenErrorSnackbar("Node with same service name cannot be added.");
      } else {
        let dataSpec;
          dataSpec = {
            label: imageName,
            serviceName: serviceName,
            volumes: [
              {
                host: hostVolume,
                container: containerVolume,
              },
            ],
          };
        const newNode = {
          id: serviceName,
          position: {
            x: Math.random() * 200,
            y: Math.random() * 200,
          },
          data: dataSpec,
          type: "containerNode",
        };
        reactFlowInstance.addNodes(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onClickUpdateHostEdge = useCallback((conPort, hPort) => {
    setPortSettings({
      hostPort: hPort,
      containerPort: conPort,
    });
  });

  const onClickAddHostEdge = useEffect(() => {
    if (hostEdge) {
      setEdges((eds) => addEdge({ type: "portEdge", data: portSettings, ...hostEdge }, eds));
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
          params["animated"] = true;
          const modEdge = {
            type: "smoothstep",
            animated: true,
            label: "depends on",
            labelStyle: { fill: "blue", fontWeight: 500 },
            ...params,
          };

          return addEdge(modEdge, eds);
        }
      });
    },
    [setEdges]
  );

  // const onNodeSelect = (_, node) => {
  //   setOpenNodeToolTip(true);
  //   console.log("tool tip open for " + node.id);
  // };

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
      setComposeContent(rusty_str);
      setOpenComposePrompt(true);
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
      <h2 className="icon-style">Composed</h2>
      <MiniMap />
      <CustomControl openNodeDialog={onClickOpenNodeDialog} removeNode={onClickRemoveNode} submit={onClickSubmit} />
      <Background />
      <NodeCreatePrompt
        open={openNodePrompt}
        setValue={onClickAddNode}
        handleClose={handleCloseNodeDialog}
        setError={setAndOpenErrorSnackbar}
      />
      <HostEdgeCreatePrompt
        open={openEdgePrompt}
        setValue={onClickUpdateHostEdge}
        handleClose={handleCloseEdgeDialog}
        setError={setAndOpenErrorSnackbar}
      />
      <ComposePrompt open={openComposePrompt} handleClose={handleCloseComposeDialog} content={composeContent} />
      <Snackbar
        open={openErrorMessage}
        autoHideDuration={4000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ComposedFlow;
