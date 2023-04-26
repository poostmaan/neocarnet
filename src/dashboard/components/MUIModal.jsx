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

const MUIModal = ({ children, buttonName, modalTitle = "", icon }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button style={{ marginButtom: "2rem" }} variant="contained" onClick={handleOpen} startIcon={icon}>
                {buttonName}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    onClick: () => {
                        // Evita que el modal se cierre al hacer clic fuera de él
                    },
                }}
            >
                <Fade in={open}>
                    <Grid containers
                        style={{
                            backgroundColor: "#fff",
                            padding: "24px",
                            borderRadius: "4px",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
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
                        <Typography variant="body1" gutterBottom>
                            {children}
                        </Typography>
                    </Grid>
                </Fade>
            </Modal>
        </>
    );
};

export default MUIModal;
