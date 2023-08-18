import { useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useCarnetsStore } from "../../../../hooks";
import { ChipFields } from "./ChipFields";

export const EditorControlsSidebar = ({ handleExportSvg }) => {

  const {
    activeCarnet,
    updateFields,
    setInitFields,
    loading
  } = useCarnetsStore();

  const fields = ["nombre", "cedula", "cargo"]; 

  const fileInputRef = useRef();
  const fieldsInUse = activeCarnet?.fields?.split(",") || []; 

  useEffect(() => {

    setInitFields(fieldsInUse);

  }, [])

  return (
    <>
      <input
        type="file"
        name="subirFondo"
        id="subirFondo"
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <Typography>Sugerencia de fondos: </Typography>
      <Box
        sx={{
          display: "flex",
          mb: 2,
        }}
      >
        {imageTemplates.map((img) => (
          <img
            src={img}
            key={img}
            width="65"
            height="95"
            alt="image"
            className="carnetTemplates pointer"
          />
        ))}
      </Box>

      <Box sx={{ mb: 1 }}>
        {fields.map((field) => (
          <ChipFields field={field} active={fieldsInUse.includes(field)} />
        ))}
      </Box>

      <Button
        id="addBackgroundbtn"
        onClick={() => {
          fileInputRef.current.click();
        }}
        variant="outlined"
        fullWidth
        sx={{ mb: 1 }}
      >
        Agregar fondo personalizado
      </Button>

      <a href="/w/dashboard/editor#render">
        <Button id="previsualise" variant="outlined" fullWidth sx={{ mb: 1 }}>
          Previsualizar
        </Button>
      </a>

      <Button
        id="toSvgBtn"
        variant="outlined"
        fullWidth
        onClick={handleExportSvg}
        disabled={loading}
      >
        Guardar
      </Button>
    </>
  );
};


const imageTemplates = [
  "https://neocarnets.neoaplicaciones.com/assets/carnetsTemplates/carnetTemplate1.png",
  "https://neocarnets.neoaplicaciones.com/assets/carnetsTemplates/carnetTemplate2.png",
  "https://neocarnets.neoaplicaciones.com/assets/carnetsTemplates/carnetTemplate3.png",
];
