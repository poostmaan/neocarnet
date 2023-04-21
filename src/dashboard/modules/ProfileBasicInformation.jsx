import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled, Badge, IconButton } from "@mui/material";
import { useAuthStore, useForm } from "../../hooks";
import { getEnvVariables } from "../../helpers";
import CameraAlt from "@mui/icons-material/CameraAlt";
import { useTheme } from "@emotion/react";
import { useState } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    display: 'inline-flex',
    backgroundColor: '#44b700',
    color: '#fff',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  }
}));

const formValidation = {
  bussinessName: [ (value) => value.length >= 2, 'El nombre del negocio no puede estar vacío'],
  rif: [ (value) => /^([VEJPG]{1})([0-9]{9})/.test(value), 'El RIF es inválido. Debe lucir como J123456789' ],
  phone: [ (value) => /^58(0?(412|414|416|424|426|243))([0-9]{0,7})$/.test(value), 'El teléfono es inválido. Debe lucir como 584241234567' ],
  email: [ (value) => value.includes('@'), 'El correo ingresado no es válido' ],
}
const formData = {
  bussinessName: "",
  rif: "",
  phone: "",
  email: "",
  direction: "",
  bussinessType: "1",
  stateCountry: "4",
  latitude: "",
  longitude: "",
  password: "",
  repassword: ""
}

export const ProfileBasicInformation = () => { 
  
  const { bussiness } =  useAuthStore();
  const theme = useTheme();
  const [logourl, setLogourl] = useState(bussiness.logourl);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    bussinessName,
    rif,
    phone,
    email,
    direction,

    bussinessNameValid,
    rifValid,
    phoneValid,
    emailValid,

    onInputChange,
    formSubmitted
  } = useForm(bussiness, formValidation);
  
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onload = (event) => {
      setLogourl( event.target.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <>
      <Paper
        elevation={2}
        sx={{ 
          my: { xs: 3, md: 2 }, 
          p: { xs: 2, md: 3 },
          borderRadius: '10px'  
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* <StyledBadge
            badgeContent={ <CameraAltIcon /> } 
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            onClick={ () => console.log('camera')}
            sx={{ cursor: 'pointer' }}
          >
            <Box sx={{
              width: 100,
              height: 100,
              margin: 'auto',
              borderRadius: '50%'
            }}>
              <img src={ logourl } alt="dede" sizes="large" width={100}/>
            </Box>
          </StyledBadge> */}
          <Box className="MuiBox-root css-71p4a3">
            <Badge badgeContent={
              <label htmlFor="icon-button-file">
                <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={handleChange}/>
                <IconButton color="primary" aria-label="upload picture" component="span" sx={{ backgroundColor: theme.palette.secondary.main, "&:hover": {backgroundColor: theme.palette.secondary.main } }} disableHoverListener>
                  <CameraAlt />
                </IconButton>
              </label>
            } overlap="circular">
              <div className="MuiBox-root css-h5i7f3">
                <img src={ logourl } alt="Team Member" width={105} height={105} style={{ borderRadius: "50%"}}/>
              </div>
            </Badge>
          </Box>
        </Grid> 
      </Paper>
      <Paper
        variant="elevation"
        elevation={2}
        sx={{ 
          my: { xs: 3, md: 2 }, 
          p: { xs: 2, md: 3 },
          borderRadius: '10px' 
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
          Datos personales
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="bussinessName"
              name="bussinessName"
              label="Nombre "
              fullWidth
              autoComplete="Nombre del comercio/empresa/club"
              variant="outlined"
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
              id="rif"
              name="rif"
              label="R.I.F"
              fullWidth
              autoComplete="R.I.F"
              variant="outlined"
              value={rif}
              onChange={onInputChange}
              helperText={formSubmitted ? rifValid : ''}
              error={!!rifValid && formSubmitted}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="direction"
              name="direction"
              label="Dirección"
              fullWidth
              autoComplete="Direccion"
              variant="outlined"
              value={direction}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Teléfono"
              fullWidth
              autoComplete="Número de telefono"
              variant="outlined"
              value={phone}
              onChange={onInputChange}
              helperText={formSubmitted ? phoneValid : ''}
              error={!!phoneValid && formSubmitted}
              inputProps={{ maxLength: 12 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              value={email}
              onChange={onInputChange}
              helperText={formSubmitted ? emailValid : ''}
              error={!!emailValid && formSubmitted}
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
          >
            Guardar&nbsp;
            <SaveIcon fontSize="small"/>  
          </Button>
        </Box>
      </Paper>
    </>
  )
}
