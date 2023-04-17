import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ReCAPTCHA from "react-google-recaptcha";
import { useAuthStore } from '../../hooks';
import axios from 'axios';


export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();
  const baseURL = "https://jsonplaceholder.typicode.com/posts";
  // const [captchaValidate, setCatchaValidate] = React.useState(false);

  // const captcha = useRef(null);

  const [validatedUser, setValidateUser] = useState(false);
  const [post, setPost] = useState(null);

  function createPost() {
    axios
      .post(baseURL, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        console.log(response);
        setPost(response.data);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries([...formData]);
    data.captcha = validatedUser;
    startLogin(data);
  };

  const onChange = (value) => {
    (value) ? setValidateUser(true) : false;
  }

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
          Control de acceso
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {errorMessage && <div>{errorMessage}</div>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Cotraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Grid container sx={{ justifyContent: "center" }}>
            <ReCAPTCHA
              sitekey="6LcrMIYlAAAAAC3mrjBAezUwBoAy4kZwbdKm5dVS"
              onChange={onChange}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                ¿No tienes cuenta? Regístrate aquí
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
