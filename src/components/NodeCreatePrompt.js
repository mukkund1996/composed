import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

const NodeCreatePrompt = ({ open, setValue, handleClose }) => {
  const [containerName, setContainerName] = useState("");
  const [serviceName, setServiceName] = useState("");

  const handleContainerName = (event) => {
    const { _, value } = event.target;
    setContainerName(value);
  };

  const handleServiceName = (event) => {
    const { _, value } = event.target;
    setServiceName(value);
  };

  const onClickCreate = () => {
    if (containerName.length !== 0 && serviceName.length !== 0) {
      setValue(containerName, serviceName);
      handleClose();
    }
  };

  const onClickClose = () => {
    handleClose();
  };

  return (
    <Dialog open={open}>
      <TextField
        id="service-name"
        label="Service Name"
        variant="outlined"
        onChange={handleServiceName}
      />
      <TextField
        id="image-name"
        label="Image Name"
        variant="outlined"
        onChange={handleContainerName}
      />
      <Button variant="contained" onClick={onClickCreate}>
        Create
      </Button>
      <Button variant="contained" onClick={onClickClose}>
        Close
      </Button>
    </Dialog>
  );
};

export default NodeCreatePrompt;
