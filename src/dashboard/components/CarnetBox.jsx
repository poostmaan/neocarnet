import { makeStyles } from '@mui/styles';
import {
  Button,
  Grid,
  Typography,
} from "@mui/material";

import { FiCard, FiCardActions, FiCardContent, FiCardMedia } from "./";
import { AppLink } from "../../components";
import { useAuthStore, useCarnetsStore } from '../../hooks';

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  /**
   * Max Card with for demo
   * same values used in Material-Ui Card Demos
   */
  card: {
    maxWidth: 345
  },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */
  media: {
    // height: 400
    filter: 'blur(2px)',
  },

  /**
   * Demo stlying to inclrease text visibility
   * May verry on implementation
   */
  fiCardContent: {
    height: '60%',
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,.24)"
  },
  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)"
  }
});

export const CarnetBox = ({ carnet }) => {

  const { id, title, description } = carnet;
  const { setActiveCarnet } = useCarnetsStore();

  const classes = useStyles();

  return (
    <Grid item xs={3}>
      <FiCard className={classes.card} sx={{ width: 258, height: 400 }}>
        <FiCardMedia
          media="picture"
          alt="Contemplative Reptile"
          image="/assets/defaultCarnet.png"
          title="Contemplative Reptile"
          className={classes.media}
        />
        <FiCardContent className={classes.fiCardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            className={classes.fiCardContentTextSecondary}
            component="p"
          >
            {description}
          </Typography>
        </FiCardContent>
        <FiCardActions className={classes.fiCardContent}>
          <AppLink
            path={`/dashboard/persons?id=${btoa(id)}`}
            color="white"
          >
            <Button size="small" color="inherit" variant="outlined" onClick={ () => setActiveCarnet(carnet) }>
              Ver mas
            </Button>
            <Button size="small" color="inherit" variant="outlined" onClick={ () => { disableCarnet(id) } }>
              Deshabilitar
            </Button>
          </AppLink>
        </FiCardActions>
      </FiCard>
    </Grid>
  );
};
