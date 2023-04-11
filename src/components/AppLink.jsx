import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

export const AppLink = ({ path, color, label, children }) => {

  return (
    <Link
      component={RouterLink}
      to={path}
      sx={{ textDecoration: "none", color: !color ? 'black' : color }}
    >
      { !children ? label : children }
    </Link>
  );
};
