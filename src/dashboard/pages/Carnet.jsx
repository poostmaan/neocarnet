import {
  Box,
  Grid,
  Typography,
  Card,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DashboardLayout } from "../layouts";
import { CarnetBox } from "../components";

export const Carnet = () => {
  return (
    <DashboardLayout nameModule="Carnet">
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
          [1,2,3,4].map(carnet => <CarnetBox key={carnet}/>)
        }
      </Grid>
    </DashboardLayout>
  );
};
