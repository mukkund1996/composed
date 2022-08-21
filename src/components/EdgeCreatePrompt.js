import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

const EdgeCreatePrompt = ({ open, setValue, handleClose }) => {
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
    }
  };

  const onClickClose = () => {
    handleClose();
  };

  return (
    <Dialog open={open}>
      <TextField
        id="container-port"
        label="Container Port"
        variant="outlined"
        onChange={handleContainerPort}
      />
      <TextField
        id="host-port"
        label="Host Port"
        variant="outlined"
        onChange={handleHostPort}
      />
      <Button variant="contained" onClick={onClickCreate}>
        Create Edge
      </Button>
      <Button variant="contained" onClick={onClickClose}>
        Close
      </Button>
    </Dialog>
  );
};

export default EdgeCreatePrompt;
