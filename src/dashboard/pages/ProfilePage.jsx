import { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ProfileListItems } from "../components";
import { DashboardLayout } from "../layouts";
import { ProfileApiKeys, ProfileBasicInformation } from "../modules";

function getModuleContent(moduleName) {
  switch (moduleName) {
    case "basicinformation":
      return <ProfileBasicInformation />;
    case "ApiKeys":
      return <ProfileApiKeys /> 
    default:
      return "default404"
  }
}

export const ProfilePage = () => {

  const [activeModule, setActiveModule] = useState("basicinformation");

  return (
    <DashboardLayout>
      <Grid container>
        <Grid item md={4}>
          <Paper
            elevation={2}
            sx={{ 
              my: { xs: 3, md: 2 }, 
              p: { xs: 2, md: 3 }, 
              mr: 2,
              borderRadius: '10px' 
            }}
          >
            <ProfileListItems handleClick={setActiveModule} activeModule={activeModule} /> 
          </Paper>
        </Grid>
        <Grid item md={8}>
            <>
              { getModuleContent(activeModule) }
            </>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
