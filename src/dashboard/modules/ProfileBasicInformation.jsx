import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled, Badge } from "@mui/material";

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

export const ProfileBasicInformation = () => {
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
          <StyledBadge
            badgeContent={ <CameraAltIcon /> } 
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Box sx={{
              width: 100,
              height: 100,
              margin: 'auto',
              borderRadius: '50%'
            }}>
              <img src="https://matx-react.ui-lib.com/assets/images/avatars/001-man.svg" alt="dede" sizes="large" />
            </Box>
          </StyledBadge>
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
        <Typography variant="h6" gutterBottom>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="stateCountry"
              name="stateCountry"
              label="Estado"
              fullWidth
              variant="outlined"
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
