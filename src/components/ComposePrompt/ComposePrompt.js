import { useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';

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
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Docker Compose Configuration</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText 
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          style={{whiteSpace: 'pre-wrap'}}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton variant="outlined" onClick={handleClose}><CloseIcon /></IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ComposePrompt;
