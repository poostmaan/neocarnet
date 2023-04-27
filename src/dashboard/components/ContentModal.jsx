import { useState } from 'react';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Avatar, Box, Button, Container, CssBaseline, FormHelperText, Grid, Typography } from "@mui/material";
import { useAuthStore } from '../../hooks';

const ContentModal = () => {

	const [filename, setFilename] = useState("");
	const { bussiness } = useAuthStore();
	console.log(bussiness);

	const handleInputFile = (e) => {

		if (!e.target.files) {
			return;
		}

		const file = e.target.files[0];
		const { name } = file;
		setFilename('Nombre del archivo: ' + name);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target.form);
		console.log(formData.get("csv"));
		console.log(bussiness);
	}

	return (
		<Container component="main" maxWidth="xs" >
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<PersonAddIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Cargar personas
				</Typography>
				<Box component="form" id="csv-form" noValidate sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} sx={{ wordBreak: 'break-word' }}>
							{filename}
						</Grid>
						<Grid item xs={12} sm={12}>
							<Button
								component="label"
								variant="outlined"
								startIcon={<UploadFileOutlinedIcon />}
								fullWidth
							>
								Subir archivo
								<input type="file" accept=".csv,.xlsx" name="csv" hidden onChange={handleInputFile} />
								<input type="hidden" name="neo_id" hidden />
							</Button>
							<FormHelperText>Nota: Solo se permiten archivos CSV (Comma Separated Values) y Excel (XLSX) utilizando el formato especificiado. <a href='#'>Click aquí para descargar el formato</a></FormHelperText>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						startIcon={<SendIcon />}
						sx={{ mt: 3, mb: 2 }}
						onClick={handleSubmit}
					>
						Enviar archivo
					</Button>
				</Box>
			</Box>
		</Container >
	);
}

export default ContentModal;