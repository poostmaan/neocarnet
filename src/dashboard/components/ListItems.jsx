import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { AppLink } from '../../components';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <AppLink path="/dashboard" label="Dashboard">
          <ListItemText primary="Dashboard" />
        </AppLink>
    </ListItemButton>
    <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <AppLink path="/dashboard/persons" label="Personas">
          <ListItemText primary="Personas" />
        </AppLink>
    </ListItemButton> 
  </React.Fragment>
);

