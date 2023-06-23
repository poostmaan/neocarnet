import { DashboardLayout } from "../layouts"
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useEffect, useRef } from "react";
import { Box, Grid,  Chip, Button, Typography } from "@mui/material";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import StayPrimaryLandscapeIcon from '@mui/icons-material/StayPrimaryLandscape';
import StayPrimaryPortraitIcon from '@mui/icons-material/StayPrimaryPortrait';
import {initCanvas} from './miscript'

export const CarnetPage = () => {

  const fileInputRef = useRef();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  useEffect(() => {
    initCanvas()
  }, []);
  

  return (
    <DashboardLayout>
      <div>Aqui podras crear, eliminar y editar los carnets</div>
      {/* <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button> */}
      <Grid container>
        {/* <Grid item md={2}>
          <Box sx={{
            display: 'flex',
            flexDirection: "column",  
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            mb: 2,
            py:4
          }}>
            <span>Vertical</span>
            <StayPrimaryPortraitIcon />  
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: "column",  
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ddd",
            py: 4
          }}>
            <span>Horizontal</span>
            <StayPrimaryLandscapeIcon /> 
          </Box>
        </Grid> */}
        <Grid item md={9}>

          <Box sx={{
            display: 'flex',
            flexDirection: "row",  
            justifyContent: "center",
            backgroundColor: "#ddd",
            mx: 2,
          }}>
            <button id="bold">Bold</button>
            <button id="italic">Italic</button>
            <button id="underline">Underline</button>
            <Box sx={{
              height: "500px",
              width: "318px",
              backgroundColor: "#ccc",
              borderRadius: '20px',
            }}>
              {/* <FabricJSCanvas className="sample-canvas" onReady={onReady} /> */}
              <canvas id="design" width="318" height="500"></canvas>
            </Box>
          </Box>

        </Grid>
        <Grid item md={3}>
          <input type="file" name="subirFondo" id="subirFondo" style={{ display: 'none'}} ref={fileInputRef}/>
          <Typography>Sugerencia de fondos: </Typography>
          <Box sx={{
            display: 'flex', 
            mb: 2,
          }}>
            {imageTemplates.map(img => <img src={img} key={img} width="65" height="95" alt="image"/>)}
          </Box>
          <Button id="addBackgroundbtn" onClick={ ()=>{ fileInputRef.current.click() }} variant="outlined" fullWidth sx={{ mb: 2}}>Agregar fondo personalizado</Button>
          <Chip label="cedula" onDelete={handleDelete} />
          <Chip label="nombre" onDelete={handleDelete} />
          <Chip label="apellido" onDelete={handleDelete} />
          <Chip label="nrereferencia" onDelete={handleDelete} />
          <Button id="toSvgBtn" variant="outlined" fullWidth>Guardar</Button>
        </Grid>
      </Grid>

    </DashboardLayout>
  )
}

const imageTemplates = ['https://neocarnets.neoaplicaciones.com/assets/bussinessTemplates/fvb.png', 'https://neocarnets.neoaplicaciones.com/assets/bussinessTemplates/asturiano.png']
