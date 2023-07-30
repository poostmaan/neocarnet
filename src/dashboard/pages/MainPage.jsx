import React from 'react';
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { DashboardLayout } from "../layouts";
import { useEffect } from "react";
import { useAuthStore, usePersons } from "../../hooks";
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { AppLink } from '../../components';

export const MainPage = () => {

  const { bussiness } = useAuthStore();
  const { getBussinessPersons } = usePersons();

  // ** Cargar todas las personas de esa empresa para el datatable de personas
  useEffect(() => {
    getBussinessPersons(bussiness.id);
  }, [])

  const cardPerson = {
    icon: <PersonIcon />,
    title: "Añadir personal",
    description: "Inicia en NeoCarnets agregando tu personal",
    link: "/dashboard/persons",
  }

  const cardCarnet = {
    icon: <CreditCardIcon />,
    title: "Crear Carnet",
    description: "¿Qué esperas para crear tu carnet? ¡Apresúrate a crearlo!",
    link: "/dashboard/carnets",
  }
  
  const CardDash = ({icon, title, description, link}) => {
     return (
      <Card variant="outlined" sx={{ borderTop: `5px solid blue`, width: "275px", mr: 2, boxShadow: 2}}>
        <React.Fragment>
          <CardContent>
            <Box sx={{ display: "flex", mb: 2}} alignItems="center" flexDirection="row">
              {icon} 

              <Typography sx={{ fontSize: 14, verticalAlign: "center" }} color="text.secondary">
                {title}
              </Typography>
            </Box>
            <Typography variant="h5" component="div">
            </Typography>
            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
              
            </Typography> */}
            <Typography variant="body2">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
          <AppLink path={link}>
            <Button size="small" variant="contained">Comenzar</Button>
          </AppLink>
          </CardActions>
        </React.Fragment>
        
      </Card>
    )
  };

  return (
    <DashboardLayout nameModule={"Dashboard"}>
      <Alert severity="success" color="primary" >
        <AlertTitle>Bienvenido</AlertTitle>
        Bienvenido de nuevo —
      </Alert>

      <Box sx={{ display: "flex", mt: 2 }}>
        <CardDash {...cardPerson} />
        <CardDash {...cardCarnet} />
        {/* <Card variant="outlined">{card}</Card> */}
      </Box>
    </DashboardLayout>
  );
};
