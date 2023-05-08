import { Alert, AlertTitle } from "@mui/material";
import { DashboardLayout } from "../layouts";
import { useEffect } from "react";
import { useAuthStore, usePersons } from "../../hooks";

export const MainPage = () => {

  const { bussiness } = useAuthStore();
  const { getBussinessPersons } = usePersons();

  // ** Cargar todas las personas de esa empresa para el datatable de personas
  useEffect(() => {
    getBussinessPersons(bussiness.id);
  }, [])
  

  return (
    <DashboardLayout nameModule={"Dashboard"}>
      <Alert severity="success" color="primary" >
        <AlertTitle>Bienvenido</AlertTitle>
        Bienvenido de nuevo —
      </Alert>
    </DashboardLayout>
  );
};
