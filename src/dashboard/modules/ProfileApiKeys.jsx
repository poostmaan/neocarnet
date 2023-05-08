import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, IconButton, Typography } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useApikeyStore, useAuthStore } from "../../hooks";
import { DefaultSnackbar } from "../../components/DefaultSnackbar";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export const ProfileApiKeys = () => {

  const { bussiness } = useAuthStore();

  const { 
    loading,
    errorMessage,
    deletedApikey,
    startLoadingApikeys, 
    startDeletingApikey,
    startSaveApikey, 
    newApikey,
    apikeys,
  } = useApikeyStore();

  useEffect(() => {
    startLoadingApikeys(bussiness.id); 
  }, [newApikey, deletedApikey])  

  const handleNewApiKey = () => {
    startSaveApikey(bussiness.id);
  }
  

  return (
    <>
      <DefaultSnackbar message={errorMessage} />
      <Paper
        variant="elevation"
        elevation={2}
        sx={{
          my: { xs: 3, md: 2 },
          p: { xs: 2, md: 3 },
          borderRadius: "10px",
        }}
      >

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mb: 2
          }}
        >
          <Grid item>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>API Keys</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleNewApiKey}
            >
              Agregar&nbsp;
              <AddCircleIcon fontSize="small"/>
            </Button>
          </Grid>
        </Grid> 

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Etiqueta</StyledTableCell>
                <StyledTableCell align="right">	API Keys</StyledTableCell>
                <StyledTableCell align="right">Creado</StyledTableCell>
                <StyledTableCell align="right">Estatus</StyledTableCell>
                <StyledTableCell align="right">
                  Accion
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apikeys.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.tag}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.content}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.created}</StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={ () => startDeletingApikey(bussiness.id, row.id) }>
                      <DeleteIcon /> 
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            { apikeys.length == 0 &&
            
              <Grid
                container
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Typography variant="subtitle2">No hay Api Key generada</Typography>
                </Grid>
              </Grid>
            }
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
