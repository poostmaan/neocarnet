import {
  Box,
  Grid,
  Typography,
  Card,
  Alert,
  AlertTitle,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DashboardLayout } from "../layouts";
import { CarnetBox } from "../components";
import { useCarnetsStore } from "../../hooks";
import { useEffect } from "react";

export const CarnetsPage = () => {
  const { total: carnets, startLoadingCarnet } = useCarnetsStore();

  useEffect(() => {
    startLoadingCarnet();
  }, [])
  
  const infoAlert = (
    <Alert severity="info" sx={{ mb: 1 }}>
      <AlertTitle>Información</AlertTitle>
      Comienza a crear tus carnets
    </Alert>
  );

  return (
    <DashboardLayout nameModule="Carnet">

      { carnets.length == 0 && infoAlert }

      <Grid container rowSpacing={1}>
        <Grid item xs={3}>
          <Card sx={{ width: 258, height: 400, shadow: 2, backgroundColor: "#eee" }} className="pointer">
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
        </Grid>

        {
          carnets.map((carnet, index) => <CarnetBox key={index} carnet={carnet} />)
        }
      </Grid>
    </DashboardLayout>
  );
};
