import Dialog from "@mui/material/Dialog";
import { Button, DialogTitle, Grow } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useState, forwardRef } from "react";
// CSS
import "../prompt-styles.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
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
    } else {
      setError("Container information must be specified.");
    }
  };

  const onClickClose = () => {
    handleClose();
  };

  return (
    <Dialog TransitionComponent={Transition} open={open} PaperProps={{ sx: { borderRadius: "20px", padding: "1%" } }}>
      <DialogTitle id="scroll-dialog-title" align="left">
        Add a container
      </DialogTitle>
      <div className="text-fields">
        <TextField id="service-name" label="Service Name" variant="outlined" onChange={handleServiceName} />
        <TextField id="image-name" label="Image Name" variant="outlined" onChange={handleContainerName} />
      </div>
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

export default NodeCreatePrompt;
