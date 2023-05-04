import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { useAuthStore } from "../hooks";

export const AppLink = ({ path, color, label, children }) => {

  const { cleanErrorMessage } = useAuthStore();

  return (
    <Link
      component={RouterLink}
      to={path}
      sx={{ textDecoration: "none", color: !color ? 'black' : color }}
      onClick={ cleanErrorMessage }
    >
      { !children ? label : children }
    </Link>
  );
};
