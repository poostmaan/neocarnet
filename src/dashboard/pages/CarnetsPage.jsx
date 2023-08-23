import {
  Box,
  Grid,
  Typography,
  Card,
  Alert,
  AlertTitle,
  TextField,
  Button,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DashboardLayout } from "../layouts";
import { CarnetBox } from "../components";
import { useCarnetsStore, useForm } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import MUIModal from "../components/MuiModal";

const formInitialState = {
  title: "",
  description: "",
};

export const CarnetsPage = () => {
  const { 
    total: carnets, 
    modalIsOpened,
    startLoadingCarnet, 
    startCreatingCarnet,  
    toggleModal_,
  } = useCarnetsStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const formValidators = {
    title: [(value) => value.length >= 2 , "El titulo es obligatorio"],
    description: [
      (value) => value.length >= 2,
      "El description es obligatorio",
    ],
  };

  const {
    formState,
    title,
    description,
    titleValid,
    descriptionValid,

    isFormValid,
    onInputChange,
  } = useForm(formInitialState, formValidators);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;
    startCreatingCarnet( formState )
  };

  useEffect(() => {
    startLoadingCarnet();
  }, []);

  const infoAlert = (
    <Alert severity="info" sx={{ mb: 1 }}>
      <AlertTitle>Información</AlertTitle>
      Comienza a crear tus carnets
    </Alert>
  );

  const formAddCarnet = (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate 
      >
        <Typography variant="h6">Agregar nuevo carnet</Typography>
        <TextField
          type="text"
          id="carnetTitle"
          name="title"
          label="Titulo del carnet"
          required
          fullWidth
          value={title}
          onChange={onInputChange}
          helperText={formSubmitted ? titleValid : ""}
          error={!!titleValid && formSubmitted}
          inputProps={{ maxLength: 30 }}
          autoFocus
          sx={{ mt: 3 }}
        ></TextField>
        <TextField
          type="text"
          id="carnetDescription"
          name="description"
          label="Descripción"
          required
          fullWidth
          sx={{ mt: 1 }}
          value={description}
          onChange={onInputChange}
          helperText={formSubmitted ? descriptionValid : ""}
          error={!!descriptionValid && formSubmitted}
          inputProps={{ maxLength: 25 }}
        ></TextField>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
          Guardar
        </Button>
      </Box>
    </>
  );

  return (
    <DashboardLayout nameModule="Carnet">
      {carnets.length == 0 && infoAlert}

      <MUIModal
        buttonName="Cargar personas"
        open={modalIsOpened}
        handleClose={toggleModal_}
      >
        {formAddCarnet}
      </MUIModal>

      <Grid container rowSpacing={1}>
        <Grid item xs={3}>
          <Card
            sx={{ width: 258, height: 400, shadow: 2, backgroundColor: "#eee" }}
            className="pointer"
            onClick={toggleModal_}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                color: "#aaa",
              }}
            >
              <AddCircleIcon fontSize="large" />
              <Typography variant="caption">Agregar nuevo carnet</Typography>
            </Box>
          </Card>
        </Grid>

        {carnets.map((carnet, index) => (
          <CarnetBox key={index} carnet={carnet} />
        ))}
      </Grid>
    </DashboardLayout>
  );
};
