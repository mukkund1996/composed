import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogTitle, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState, forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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
    <Dialog TransitionComponent={Transition} open={open}>
      <DialogTitle id="scroll-dialog-title">Specify the ports</DialogTitle>
      <TextField id="host-port" label="Host Port" variant="outlined" onChange={handleHostPort} />
      <TextField id="container-port" label="Container Port" variant="outlined" onChange={handleContainerPort} />
      <DialogActions>
        <IconButton variant="outlined" onClick={onClickCreate}>
          <AddIcon />
        </IconButton>
      </DialogActions>
      <DialogActions>
        <IconButton variant="outlined" onClick={onClickClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default HostEdgeCreatePrompt;
