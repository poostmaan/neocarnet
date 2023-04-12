import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ProfilesModules } from "../constants";

import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import KeyIcon from '@mui/icons-material/Key';

function getIcon(key) {
  switch (key) {
    case "basicinformation":
      return <TextSnippetIcon />
    case "ApiKeys":
      return <KeyIcon />
    default:
      return ''
  }
}

export const ProfileListItems = ({ handleClick, activeModule }) => {

  return (
    <React.Fragment>
      {Object.entries(ProfilesModules).map(([key, value]) => (
        <ListItemButton 
          key={key} 
          onClick={() => handleClick(key)} 
          sx={{
            borderLeft: activeModule == key ? "5px solid #0205a1e8" : ""
          }}>
          <ListItemIcon>
            { getIcon(key) }
          </ListItemIcon>
          <ListItemText primary={value} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};
