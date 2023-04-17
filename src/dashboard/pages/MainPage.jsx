import { Alert, AlertTitle } from "@mui/material";
import { DashboardLayout } from "../layouts";

export const MainPage = () => {
  return (
    <DashboardLayout>
      <Alert severity="success" color="primary" >
        <AlertTitle>Bienvenido</AlertTitle>
        Bienvenido de nuevo —
      </Alert>
    </DashboardLayout>
  );
};
