import { Controls, ControlButton } from "react-flow-renderer";
// MUI Imports
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Tooltip from "@mui/material/Tooltip";

import "../styles/custom-controls.css";

const CustomControl = ({ openNodeDialog, removeNode, submit }) => {
  return (
    <Controls showZoom={false} showFitView={false} showInteractive={false}>
      <ControlButton onClick={openNodeDialog}>
        <Tooltip title="Add container" placement="right">
          <AddIcon />
        </Tooltip>
      </ControlButton>
      <ControlButton onClick={removeNode}>
        <Tooltip title="Remove container" placement="right">
          <DeleteIcon />
        </Tooltip>
      </ControlButton>
      <ControlButton onClick={submit}>
        <Tooltip title="Generate docker-compose configuration" placement="bottom">
          <PlayArrowIcon />
        </Tooltip>
      </ControlButton>
    </Controls>
  );
};

export default CustomControl;
