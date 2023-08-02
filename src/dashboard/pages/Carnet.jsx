import { DashboardLayout } from "../layouts";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { Box, Grid, Button, Typography, Alert, AlertTitle, Card, CardMedia, CardActions, CardContent } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import StayPrimaryLandscapeIcon from "@mui/icons-material/StayPrimaryLandscape";
import StayPrimaryPortraitIcon from "@mui/icons-material/StayPrimaryPortrait";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCarnetStore } from '../../hooks';
import { ChipFields } from "../components";
import { width } from "@mui/system";
import { AppLink } from "../../components";

export const Carnet = () => {

  return (
    <DashboardLayout nameModule="Carnet">
      <Grid container>
        <Card sx={{ maxWidth: 345 }}>
          <Box position="relative">
            <CardMedia
              component="img"
              alt="CAC"
              height="140"
              image="/assets/cac.png"
              sx={{ position: 'absolute', width: 'auto', zIndex: '3', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
            />
            <CardMedia
              component="img"
              alt="CAC"
              height="140"
              image="/assets/cac.png"
              sx={{ position: 'relative', zIndex: '2', filter: 'blur(2px)'}}
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
          <CardActions sx={{justifyContent: 'space-evenly'}}>
            <Button size="small">Modificar</Button>
            <Button size="small">Eliminar</Button>
          </CardActions>
        </Card>
      </Grid>
    </DashboardLayout>
  );
};