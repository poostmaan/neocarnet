import { useState, useEffect } from 'react';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Alert, Avatar, Box, Button, Chip, Container, CssBaseline, FormHelperText, Grid, TextareaAutosize, Typography } from "@mui/material";
import { useAuthStore, usePersons } from '../../hooks';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DefaultSnackbar } from '../../components/DefaultSnackbar';

const ContentModal = () => {

  const [filename, setFilename] = useState("");
  const { bussiness } = useAuthStore();
  const { uploadedPeople, uploadedFailed, uploadedSucessfully, uploadPersons, errorMessage } = usePersons();

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
    const formData = new FormData(e.target);
    uploadPersons(formData, bussiness.id);
  }

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {errorMessage && <Alert severity="error">
          {errorMessage}
        </Alert>}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cargar personas
        </Typography>
        <Box component="form" id="csv-form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} sx={{ wordBreak: 'break-word' }}>
              <FormHelperText>Descarga el formato para subir tu personal: <a href='https://neocarnets.neoaplicaciones.com/assets/plantilla.csv' download target="_blank">En CSV</a> <a href='https://neocarnets.neoaplicaciones.com/assets/plantilla.xlsx' download target="_blank" >En XLSX</a></FormHelperText>
            </Grid>
            {filename && <Grid item xs={12} sm={12} sx={{ wordBreak: 'break-word' }}>
              {filename}
            </Grid>}
            <Grid item xs={12} sm={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileOutlinedIcon />}
                fullWidth
              >
                Subir archivo
                <input type="file" accept=".csv,.xlsx" name="csv" hidden onChange={handleInputFile} />
                <input type="hidden" name="club" value={bussiness.id} hidden />
              </Button>
              {/* <FormHelperText>Nota: Solo se permiten archivos CSV (Comma Separated Values) y Excel (XLSX) utilizando el formato especificiado. <a href='#'>Click aquí para descargar el formato</a></FormHelperText> */}
              <FormHelperText>Nota: Solo se permiten archivos CSV (Comma Separated Values) y Excel (XLSX) utilizando el formato especificiado.</FormHelperText>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<SendIcon />}
            sx={{ mt: 3, mb: 2 }}
          // onClick={handleSubmit}
          >
            Enviar archivo
          </Button>
          {uploadedPeople && <Grid item xs={12} sm={12}>
            {uploadedPeople && <TextareaAutosize
              defaultValue={uploadedPeople}
              value={uploadedPeople}
              readOnly
              minRows={3}
              maxRows={5}
              style={{
                width: "100%",
                resize: "none",
                outline: "1px solid #191ca9",
                fontFamily: "sans-serif"
              }}
            />}
            <Grid item xs={12} sm={12}>
              Registros exitosos: <Chip color="success" icon={<CheckIcon/>} label={uploadedSucessfully ?? 0}/> <br/>
              Registros no exitosos: <Chip color="error" icon={<CloseIcon/>} label={uploadedFailed ?? 0} /> 
            </Grid>
          </Grid>
          }
        </Box>
      </Box>
    </Container >
  );
}

export default ContentModal;