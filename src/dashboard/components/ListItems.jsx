import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { AppLink } from "../../components";

export const mainListItems = (
  <React.Fragment>
    <AppLink path="/dashboard" label="Dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </AppLink>
    <AppLink path="/dashboard/persons" label="Personas">
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Personas" />
      </ListItemButton>
    </AppLink>
    <AppLink path="/dashboard/carnets" label="Carnets">
      <ListItemButton>
        <ListItemIcon>
          <CreditCardIcon /> 
        </ListItemIcon>
        <ListItemText primary="Carnets" />
      </ListItemButton>
    </AppLink>
    <AppLink path="/dashboard/carnet" label="carnet">
      <ListItemButton>
        <ListItemIcon>
          <CreditCardIcon /> 
        </ListItemIcon>
        <ListItemText primary="carnet" />
      </ListItemButton>
    </AppLink>
  </React.Fragment>
);
