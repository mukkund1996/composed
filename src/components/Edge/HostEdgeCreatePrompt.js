import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle, Button, Grow } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, forwardRef } from "react";
import { promptStyle, headingPromptStyle } from "../styles/Styles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const HostEdgeCreatePrompt = ({ open, setValue, handleClose, setError }) => {
  const [containerPort, setContainerPort] = useState(null);
  const [hostPort, setHostPort] = useState(null);

  const handleContainerPort = (event) => {
    const { _, value } = event.target;
    setContainerPort(value);
  };

  const handleHostPort = (event) => {
    const { _, value } = event.target;
    setHostPort(value);
  };

  const onClickCreate = () => {
    if (containerPort && hostPort) {
      setValue(containerPort, hostPort);
      handleClose();
    } else {
      setError("Both ports must be entered");
    }
  };

  const onClickClose = () => {
    handleClose();
  };

  return (
    <Dialog TransitionComponent={Transition} open={open} PaperProps={{ sx: promptStyle }}>
      <DialogTitle id="scroll-dialog-title" sx={headingPromptStyle}>Specify the ports</DialogTitle>
      <div className="text-fields">
        <TextField
          id="host-port"
          helperText="Port connected to the local host"
          placeholder="Host Port"
          variant="outlined"
          onChange={handleHostPort}
        />
        <TextField
          id="container-port"
          helperText="Port connected to the container"
          placeholder="Container Port"
          variant="outlined"
          onChange={handleContainerPort}
        />
      </div>
      <div className="buttons">
        <DialogActions>
          <Button variant="text" onClick={onClickClose}>
            Close
          </Button>
        </DialogActions>
        <DialogActions>
          <Button variant="contained" onClick={onClickCreate}>
            Add
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default HostEdgeCreatePrompt;
