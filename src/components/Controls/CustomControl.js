import { Controls, ControlButton } from "react-flow-renderer";
// MUI Imports
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Tooltip from "@mui/material/Tooltip";

import { controlDiv, controlButtons, buttonSizing } from "../styles/Styles";

const CustomControl = ({ openNodeDialog, removeNode, submit }) => {
  return (
    <Controls
      style={controlDiv}
      showZoom={false}
      showFitView={false}
      showInteractive={false}
    >
      <ControlButton style={controlButtons} onClick={openNodeDialog}>
        <Tooltip title="Add container" placement="right">
          <AddIcon style={buttonSizing} />
        </Tooltip>
      </ControlButton>
      <ControlButton style={controlButtons} onClick={removeNode}>
        <Tooltip title="Remove container" placement="right">
          <DeleteIcon style={buttonSizing} />
        </Tooltip>
      </ControlButton>
      <ControlButton style={controlButtons} onClick={submit}>
        <Tooltip
          title="Generate docker-compose configuration"
          placement="bottom"
        >
          <PlayArrowIcon style={buttonSizing} />
        </Tooltip>
      </ControlButton>
    </Controls>
  );
};

export default CustomControl;
