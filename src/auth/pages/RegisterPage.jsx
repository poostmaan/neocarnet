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
import { useAuthStore, useForm } from "../../hooks";
import { AppLink } from "../../components/AppLink";

// const formData = {
//   bussinessName: "Club los Hermanos",
//   rif: "J230091222",
//   phone: "584243609289",
//   email: "",
//   direction: "",
//   logourl: "",
//   bussinessType: "1",
//   stateCountry: "Aragua",
//   latitude: "",
//   longitude: "",
//   password: ""
// }

const formData = {
  bussinessName: "Club los Hermanos",
  rif: "J230091222",
  phone: "584243609289",
  email: "club@gmail.com",
  direction: "Calle Los Olivos, El casta;o",
  logourl: "http://lo.com/imagen.png",
  bussinessType: "1",
  stateCountry: "Aragua", 
  latitude: "21.2319",
  longitude: "21.2319",
  password: "3126510LuisS"
}

const formValidation = {
  bussinessName: [ (value) => value.length >= 2, 'El nombre del negocio no puede estar vacío'],
  rif: [ (value) => /^([VEJPG]{1})([0-9]{9})/.test(value), 'El RIF es inválido. Debe lucir como J123456789' ],
  phone: [ (value) => /^58(0?(412|414|416|424|426|243))([0-9]{0,7})$/.test(value), 'El teléfono es inválido. Debe lucir como 584241234567' ],
  email: [ (value) => value.includes('@'), 'El correo ingresado no es válido' ],
  password: [ (value) => value.length >= 8, 'El password debe de tener más de 8 letras.']
}

export function RegisterPage() {
  const { startRegister } = useAuthStore();
  const [filename, setFilename] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState,

    bussinessName,
    rif,
    phone,
    email,
    direction,
    logourl,
    bussinessType,
    stateCountry,
    latitude,
    longitude,
    password,

    bussinessNameValid,
    rifValid,
    phoneValid,
    emailValid,
    passwordValid,

    isFormValid,
    onInputChange
  } = useForm( formData, formValidation );

  const handleInputFile = (e) => {

    if (!e.target.files) { return; }

    const file = e.target.files[0];
    const { name } = file;
    setFilename('Nombre del archivo: ' + name);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if ( !isFormValid ) return;

    startRegister( formState );
  };

  return (
    <Container component="main" sx={{
      maxWidth: { md: '800px'}
    }}>
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
                autoComplete="bussinessName"
                name="bussinessName"
                required
                fullWidth
                id="bussinessName"
                label="Nombre comercial"
                autoFocus
                value={bussinessName}
                onChange={onInputChange}
                helperText={bussinessNameValid}
                error={!!bussinessNameValid && formSubmitted}
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
                value={rif}
                onChange={onInputChange}
                helperText={rifValid}
                error={!!rifValid && formSubmitted}
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
                value={password}
                onChange={onInputChange}
                helperText={passwordValid}
                error={!!passwordValid && formSubmitted}
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
                value={email}
                onChange={onInputChange}
                helperText={emailValid}
                error={!!emailValid && formSubmitted}
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
                value={phone}
                onChange={onInputChange}
                helperText={phoneValid}
                error={!!phoneValid && formSubmitted}
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
                value={direction}
                onChange={onInputChange}
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
            {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="businessTypeLabel">Tipo de comercio</InputLabel>
                <Select
                  labelId="businessTypeLabel"
                  label="Tipo de comercio *"
                  id="businessType"
                >
                  <MenuItem value="1" selected>Club</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="stateCountryLabel">Estado</InputLabel>
                <Select
                  labelId="stateCountryLabel"
                  label="Estado *"
                  id="stateCountry"
                >

                  <MenuItem value="1">Aragua</MenuItem>
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
              <AppLink path="/auth/login" label="¿Ya tienes cuenta? Inicia sesión" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}