import { useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import {
  FormHelperText,
  Container,
  Typography,
  Box,
  Grid,
  CssBaseline,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Link
} from '@mui/material';

export function RegisterPage() {

  const [filename, setFilename] = useState("");

  const handleInputFile = (e) => {

    if (!e.target.files) { return; }

    const file = e.target.files[0];
    const { name } = file;
    setFilename('Nombre del archivo: ' + name);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro comercio
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="businessName"
                name="businessName"
                required
                fullWidth
                id="businessName"
                label="Nombre comercial"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="rif"
                label="R.I.F"
                name="rif"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                id="confirmPassword"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Teléfono"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="direction"
                label="Dirección"
                name="direction"
                autoComplete="direction"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileOutlinedIcon />}
                fullWidth
              >
                Subir logo
                <input type="file" accept=".csv" hidden onChange={handleInputFile} />
              </Button>
              <FormHelperText sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "break-spaces" }}>{filename}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="businessTypeLabel">Tipo de comercio</InputLabel>
                <Select
                  labelId="businessTypeLabel"
                  label="Tipo de comercio *"
                  id="businessType"
                >
                  <MenuItem value="comercio">Comercio 1</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="stateCountryLabel">Estado</InputLabel>
                <Select
                  labelId="stateCountryLabel"
                  label="Estado *"
                  id="stateCountry"
                >

                  <MenuItem value="estado">Estado 1</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <input type="hidden" />
              <input type="hidden" value />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="He leido y acepto los términos y condiciones."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear cuenta
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}