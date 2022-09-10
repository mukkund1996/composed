import { useEffect, useRef, forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grow } from "@mui/material";
import { promptStyle, headingPromptStyle, composeContent } from "../styles/Styles";
import "../styles/prompt-styles.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow direction="right" ref={ref} {...props} />;
});

const ComposePrompt = ({ open, handleClose, content }) => {
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        disableEscapeKeyDown={true}
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{ sx: promptStyle }}
      >
        <DialogTitle id="scroll-dialog-title" sx={headingPromptStyle}>Configuration</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            style={ composeContent }
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <div className="buttons">
          <DialogActions>
            <Button variant="text" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default ComposePrompt;
