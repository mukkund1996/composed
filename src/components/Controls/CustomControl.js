import { Controls, ControlButton } from "react-flow-renderer";
// MUI Imports
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import "./custom-controls.css";

const CustomControl = ({ openNodeDialog, removeNode, submit }) => {
  return (
    <Controls showZoom={false} showFitView={false} showInteractive={false}>
      <ControlButton onClick={openNodeDialog}>
        <AddIcon />
      </ControlButton>
      <ControlButton onClick={removeNode}>
        <DeleteIcon />
      </ControlButton>
      <ControlButton onClick={submit}>
        <PlayArrowIcon />
      </ControlButton>
    </Controls>
  );
};

export default CustomControl;
