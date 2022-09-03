import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle, Button, Grow } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const HostEdgeCreatePrompt = ({ open, setValue, handleClose, setError }) => {
  const [containerPort, setContainerPort] = useState("");
  const [hostPort, setHostPort] = useState("");

  const handleContainerPort = (event) => {
    const { _, value } = event.target;
    setContainerPort(value);
  };

  const handleHostPort = (event) => {
    const { _, value } = event.target;
    setHostPort(value);
  };

  const onClickCreate = () => {
    if (containerPort.length !== 0 && hostPort.length !== 0) {
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
    <Dialog TransitionComponent={Transition} open={open} PaperProps={{sx: {borderRadius: "20px", padding: "1%"}}}>
      <DialogTitle id="scroll-dialog-title">Specify the ports</DialogTitle>
      <TextField id="host-port" label="Host Port" variant="outlined" onChange={handleHostPort} />
      <TextField id="container-port" label="Container Port" variant="outlined" onChange={handleContainerPort} />
      <div className="buttons">
      <DialogActions>
        <Button variant="contained" onClick={onClickCreate}>
          Add
        </Button>
      </DialogActions>
      <DialogActions>
        <Button variant="text" onClick={onClickClose}>
          Close
        </Button>
      </DialogActions>
      </div>
    </Dialog>
  );
};

export default HostEdgeCreatePrompt;
