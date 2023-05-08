import { Alert, Slide, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export const DefaultSnackbar = ({ handleClose, message, close, alertType = "error"}) => {

  const [transition, setTransition] = useState(null);
  const [open, setOpen] = useState(false);
  const TransitionDown = (props) => <Slide {...props} direction="left" />;

  useEffect(() => {
    setTransition(() => TransitionDown);
  }, [])

  useEffect(() => {
    if (message === '' || message === null) return; 
    setOpen(true);
  }, [message])

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={transition}
      key={transition ? transition.name : ""}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={alertType}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
