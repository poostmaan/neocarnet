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

const MUIModal = ({ children, buttonName, modalTitle = "", icon }) => {

	const { cleanPeopleMessages, cleanErrorMessage } = usePersons();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		cleanPeopleMessages();
		cleanErrorMessage();
	};

	return (
		<>
			<Button variant="contained" onClick={handleOpen} startIcon={icon}>
				{buttonName}
			</Button>
			<Modal
				open={open}
				onClose={(event, reason) => {
					if (reason !== 'backdropClick') {
						handleClose(event, reason);
					}
				}}
				closeAfterTransition
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
							overflowY: "auto",
							maxHeight: "80vh"
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
