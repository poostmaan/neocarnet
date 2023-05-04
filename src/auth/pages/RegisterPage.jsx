import { useEffect, useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Container,
  Typography,
  Box,
  Grid,
  CssBaseline,
  Button,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
  AlertTitle
} from '@mui/material';
import { useAuthStore, useForm } from "../../hooks";
import { AppLink } from "../../components/AppLink";
import { DefaultSnackbar } from "../../components";

const formData = {
  bussinessName: "",
  rif: "",
  phone: "",
  email: "",
  direction: "",
  logourl: "",
  bussinessType: "1",
  stateCountry: "4",
  latitude: "",
  longitude: "",
  password: "",
  repassword: ""
}

// const formData = {
//   bussinessName: "Club los Hermanos",
//   rif: "J230091222",
//   phone: "584243609289",
//   email: "club@gmail.com",
//   direction: "Calle Los Olivos, El casta;o",
//   logourl: "http://lo.com/imagen.png",
//   bussinessType: "1",
//   stateCountry: "Aragua", 
//   latitude: "21.2319",
//   longitude: "21.2319",
//   password: "3126510luis",
//   repassword: "3126510luis"
// }

const formValidation = {
  bussinessName: [ (value) => value.length >= 2, 'El nombre del negocio no puede estar vacío'],
  rif: [ (value) => /^([VEJPG]{1})([0-9]{9})/.test(value), 'El RIF es inválido. Debe lucir como J123456789' ],
  phone: [ (value) => /^58(0?(412|414|416|424|426|243))([0-9]{0,7})$/.test(value), 'El teléfono es inválido. Debe lucir como 584241234567' ],
  email: [ (value) => value.includes('@'), 'El correo ingresado no es válido' ],
  password: [ (value) => value.length >= 8, 'El password debe de tener más de 8 letras.']
}

export function RegisterPage() {
  const { startRegister, errorMessage } = useAuthStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

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
    repassword,

    bussinessNameValid,
    rifValid,
    phoneValid,
    emailValid,
    passwordValid,

    isFormValid,
    onInputChange
  } = useForm( formData, formValidation );

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if ( !isFormValid ) return;

    startRegister( formState ); 
  };

  // useEffect(() => {
  //   if (errorMessage === '') return;
  //   setOpen(true);
  // }, [errorMessage])

  return (
    <Container component="main" sx={{
      maxWidth: { md: '800px'}
    }}>
      <DefaultSnackbar message={errorMessage} close={ () => setOpen(false) }/>
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
          Registrar organización 
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
                helperText={formSubmitted ? bussinessNameValid : ''}
                error={!!bussinessNameValid && formSubmitted}
                inputProps={{ maxLength: 30 }}
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
                helperText={formSubmitted ? rifValid : ''}
                error={!!rifValid && formSubmitted}
                inputProps={{ maxLength: 10 }}
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
                helperText={formSubmitted ? emailValid : ''}
                error={!!emailValid && formSubmitted}
                inputProps={{ maxLength: 30 }}
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
                helperText={formSubmitted ? phoneValid : ''}
                error={!!phoneValid && formSubmitted}
                inputProps={{ maxLength: 12 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="stateCountryLabel">Estado</InputLabel>
                <Select
                  labelId="stateCountryLabel"
                  label="Estado *"
                  id="stateCountry"
                  name="stateCountry"
                  value={stateCountry}
                  autoComplete="Estado"
                  onChange={onInputChange}  
                >
                  <MenuItem value="4">Aragua</MenuItem>
                  <MenuItem value="24">Caracas</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid sm={12} sx={{ mt: 2, ml: '20px' }}>

              <Alert severity="info">
                <AlertTitle>Crear una contraseña segura:</AlertTitle>
                <ul>
                  <li>La contraseña debe tener al menos 6 caracteres</li>
                  <li>La contraseña no puede tener más de 16 caracteres</li>
                  <li>La contraseña debe tener al menos una letra minúscula</li>
                  <li>La contraseña debe tener al menos una letra mayúscula</li>
                  <li>La contraseña debe tener al menos un caracter numérico</li>
                </ul>
              </Alert>

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
                helperText={formSubmitted ? passwordValid : ''}
                error={!!passwordValid && formSubmitted}
                inputProps={{ maxLength: 16 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="repassword"
                label="Confirmar Contraseña"
                type="password"
                id="repassword"
                autoComplete="renew-password"
                value={repassword}
                onChange={onInputChange}
                helperText={formSubmitted ? repassword == password ? '' : "Las contraseña no coinciden" : ''}
                error={repassword != password && formSubmitted}
                inputProps={{ maxLength: 16 }}
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
            
            <Grid item xs={12}>
              <input type="hidden" />
              <input type="hidden" value />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="He leido y acepto los términos y condiciones."
              />
            </Grid> */}
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