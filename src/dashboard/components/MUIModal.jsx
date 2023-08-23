import { useState } from "react";
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usePersons } from "../../hooks";
import { ContentModalWrapper } from "./ContentModalWrapper";

const MUIModal = ({ children, buttonName, modalTitle = "", icon, open, handleClose }) => {
  console.log(open);
  return (
    <>
      {/* <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={icon}
        ref={btnRef}
      >
        {buttonName}
      </Button> */}
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose(event, reason);
          }
        }}
        closeAfterTransition
      >
        <Fade in={open}>
          <ContentModalWrapper>
            <Grid
              container
              className="modalContainer"
              style={{
                backgroundColor: "#fff",
                padding: "24px",
                borderRadius: "4px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflowY: "auto",
                maxHeight: "80vh",
                width: "100%",
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                {modalTitle}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Grid container>{children}</Grid>
            </Grid>
          </ContentModalWrapper>
        </Fade>
      </Modal>
    </>
  );
};

export default MUIModal;
