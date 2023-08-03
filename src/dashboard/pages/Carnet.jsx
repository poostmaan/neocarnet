import { DashboardLayout } from "../layouts";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Card,
  CardMedia,
  CardActions,
  CardContent,
 
} from "@mui/material";

import { makeStyles } from '@mui/styles';
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import StayPrimaryLandscapeIcon from "@mui/icons-material/StayPrimaryLandscape";
import StayPrimaryPortraitIcon from "@mui/icons-material/StayPrimaryPortrait";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCarnetStore } from "../../hooks";
import { width } from "@mui/system";
import { AppLink } from "../../components";
import { ChipFields, FiCard, FiCardActions, FiCardContent, FiCardMedia } from "../components";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  /**
   * Max Card with for demo
   * same values used in Material-Ui Card Demos
   */
  card: {
    maxWidth: 345
  },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */
  media: {
    // height: 400
    filter: 'blur(2px)',
  },

  /**
   * Demo stlying to inclrease text visibility
   * May verry on implementation
   */
  fiCardContent: {
    height: '60%',
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,.24)"
  },
  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)"
  }
});

export const Carnet = () => {
  const classes = useStyles();
  return (
    <DashboardLayout nameModule="Carnet">
      <Grid container>
        <Card sx={{ width: 258, shadow: 2, backgroundColor: "#eee" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              color: "#aaa"
            }}
          >
            <AddCircleIcon fontSize="large" />
            <Typography variant="caption" >Agregar nuevo carnet</Typography>
          </Box>
        </Card>
        {/* <Card sx={{ width: 258, shadow: 2 }}>
          <Box position="relative">
            <CardMedia
              component="img"
              alt="CAC"
              height="140"
              image="/assets/cac.png"
              sx={{
                position: "absolute",
                width: "auto",
                zIndex: "3",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <CardMedia
              component="img"
              alt="CAC"
              height="140"
              image="/assets/cac.png"
              sx={{ position: "relative", zIndex: "2", filter: "blur(2px)" }}
            />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Carnet N-1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Este carnet va dirigido y emitido para los trabajadores y obreros
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "end" }}>
            <Typography variant="subtitle2">Creado: 20-05-2023</Typography>
            <div>
              <AppLink path="/dashboard/carnets">
                <Button size="small" title="Editar">
                  <EditIcon />
                </Button>
              </AppLink>
              <Button size="small" title="Eliminar">
                <DeleteIcon />
              </Button>
            </div>
          </CardActions>
        </Card> */}

        <Box my={4} sx={{ m: 0}}>
          <FiCard className={classes.card} sx={{ width: 258, height: 400 }}>
            <FiCardMedia
              media="picture"
              alt="Contemplative Reptile"
              image="/assets/cac.png"
              title="Contemplative Reptile"
              className={classes.media}
            />
            <FiCardContent className={classes.fiCardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography
                variant="body2"
                className={classes.fiCardContentTextSecondary}
                component="p"
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </FiCardContent>
            <FiCardActions className={classes.fiCardContent}>
              <AppLink path="/dashboard/persons">

                <Button size="small" color="inherit" variant="outlined">
                  Ver mas
                </Button>
              </AppLink>
            </FiCardActions>
          </FiCard>
        </Box>
      </Grid>
    </DashboardLayout>
  );
};
