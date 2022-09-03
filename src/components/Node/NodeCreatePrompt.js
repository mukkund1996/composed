import Dialog from "@mui/material/Dialog";
import { Button, DialogTitle, Grow } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useState, forwardRef } from "react";
import { promptStyle, textPromptStyle, headingPromptStyle } from "../Styles";
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
    <Dialog variant="outlined" TransitionComponent={Transition} open={open} PaperProps={{ sx: promptStyle }}>
      <DialogTitle id="scroll-dialog-title" align="left" sx={headingPromptStyle}>
        Add a container
      </DialogTitle>
      <div className="text-fields">
      <TextField
        id="service-name"
        helperText="Name of the microservice"
        placeholder="Service"
        variant="outlined"
        onChange={handleServiceName}
      />
      <TextField
        id="image-name"
        helperText="Image ID of the microservice"
        placeholder="Image"
        variant="outlined"
        onChange={handleContainerName}
      />
      </div>
      <div className="buttons">
        <DialogActions>
          <Button variant="text" onClick={onClickClose}>
            Close
          </Button>
          <DialogActions>
            <Button variant="contained" onClick={onClickCreate}>
              Add
            </Button>
          </DialogActions>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default NodeCreatePrompt;
