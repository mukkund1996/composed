import Dialog from "@mui/material/Dialog";
import { DialogTitle, IconButton } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState, forwardRef } from "react";
// CSS
import "../prompt-styles.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const NodeCreatePrompt = ({ open, setValue, handleClose, setError }) => {
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
    else {
      setError("Container information must be specified.");
    }
  };

  const onClickClose = () => {
    handleClose();
  };

  return (
    <Dialog TransitionComponent={Transition} open={open}>
      <DialogTitle id="scroll-dialog-title">Add a container</DialogTitle>
      <TextField id="service-name" label="Service Name" variant="outlined" onChange={handleServiceName} />
      <TextField id="image-name" label="Image Name" variant="outlined" onChange={handleContainerName} />
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

export default NodeCreatePrompt;
