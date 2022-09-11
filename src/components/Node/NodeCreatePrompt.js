import Dialog from "@mui/material/Dialog";
import { Button, DialogTitle, Grow } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useState, forwardRef } from "react";
import { promptStyle, headingPromptStyle } from "../styles/Styles";
// CSS
import "../styles/prompt-styles.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const NodeCreatePrompt = ({ open, setValue, handleClose, setError }) => {
  const [containerName, setContainerName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [containerVolume, setContainerVolume] = useState(null);
  const [hostVolume, setHostVolume] = useState(null);

  const handleContainerName = (event) => {
    const { value } = event.target;
    setContainerName(value);
  };

  const handleServiceName = (event) => {
    const { value } = event.target;
    setServiceName(value);
  };
  
  const handleContainerVolume = (event) => {
    const { value } = event.target;
    setContainerVolume(value);
  };
  
  const handleHostVolume = (event) => {
    const { value } = event.target;
    setHostVolume(value);
  };

  const onClickCreate = () => {
    if (containerName.length !== 0 && serviceName.length !== 0) {
      setValue(containerName, serviceName, hostVolume, containerVolume);
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
      <TextField
        id="volume-container"
        helperText="Directory in the container"
        placeholder="Container Volume"
        variant="outlined"
        onChange={handleContainerVolume}
      />
      <TextField
        id="volume-host"
        helperText="Directory in the host"
        placeholder="Host Volume"
        variant="outlined"
        onChange={handleHostVolume}
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
