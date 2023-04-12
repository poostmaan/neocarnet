import { DashboardLayout } from '../layouts';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { FormHelperText, Container, Typography, Box, Grid, CssBaseline, Button, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const theme = createTheme();

export function ControlPersons() {

  const [filename, setFilename] = useState("");

  const handleInputFile = (e) => {

    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const { name } = file;
    setFilename('Nombre del archivo: ' + name);
  }

  return (
    <DashboardLayout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
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
            <Box component="form" noValidate sx={{ mt: 3 }}>
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
                    Subir archivo CSV
                    <input type="file" accept=".csv" hidden onChange={handleInputFile} />
                  </Button>
                  <FormHelperText>Nota: Solo se permiten archivos CSV (Comma Separated Values) y utilizando el formato especificiado. <a href='#'>Click aquí para descargar el formato</a></FormHelperText>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar archivo
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </DashboardLayout>
  );
}