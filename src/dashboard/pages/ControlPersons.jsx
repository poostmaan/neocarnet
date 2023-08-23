import { DashboardLayout } from '../layouts';
import React, { useState } from "react";
import { Alert, AlertTitle, Box, Breadcrumbs, Button, Grid, IconButton, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MUIDataTable from 'mui-datatables';
import { useCarnetsStore, usePersons } from '../../hooks';
import MUIModal from '../components/MuiModal';
import ContentModal from '../components/ContentModal';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AppLink } from '../../components';
import CloseIcon from '@mui/icons-material/Close';
import AddCardIcon from '@mui/icons-material/AddCard';

export function ControlPersons() {

  const { getPersonsByCarnetid, activeCarnet } = useCarnetsStore();
  const personsByCarnetid = getPersonsByCarnetid(activeCarnet.id);

  const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
    // cleanPeopleMessages();
		// cleanErrorMessage();
	};

  const state = {
    downloadFile: true,
  };

  const columns = [
    {
      name: "credential",
      label: "Cédula"
    }, {
      name: "name",
      label: "Nombre completo"
    },
    {
      name: "phone",
      label: "Teléfono"
    },
    {
      name: "email",
      label: "Correo"
    }
  ];

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: 4,
    selectableRows: "none",
    downloadOptions: {
      filename: 'excel-format.csv',
      separator: ';',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    },
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se encontraron registros",
        toolTip: "Ordenar",
        columnHeaderTooltip: column => `Ordenar por ${column.label}`
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de"
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla"
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "RESETEAR"
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      if (state.downloadFile) {
        let val = `${buildHead(columns)}${buildBody(data)}`.trim();
        return val;
      }

      return false;
    },
    onRowSelectionChange: (currentRowsSelected, allRows, rowsSelected) => {
      console.log(currentRowsSelected, allRows, rowsSelected);
    },
    onRowsDelete: rowsDeleted => {
      console.log(rowsDeleted, 'were deleted!');
    },
    onChangePage: numberRows => {
      console.log(numberRows);
    },
    onSearchChange: searchText => {
      console.log(searchText);
    },
    onColumnSortChange: (column, direction) => {
      console.log(column, direction);
    },
    onViewColumnsChange: (column, action) => {
      console.log(column, action);
    },
    onFilterChange: (column, filters) => {
      console.log(column, filters);
    },
    onCellClick: (cellIndex, rowIndex) => {
      console.log(cellIndex, rowIndex);
    },
    onRowClick: (rowData, rowState) => {
      console.log(rowData, rowState);
    },
  };

  
  return (
    <DashboardLayout nameModule="Carnets" properties={{ margin: 2 }}>
      {
        personsByCarnetid.length === 0
        ? 
        (
          <Box sx={{ display: "flex", flexDirection:"column",  alignItems: "center", alignContent: "center", mb: 2 }}>
              <Box sx={{ border: "2px solid #ddd", borderRadius: "50%", p: 2, mb: 2, height: "64" }}>
                <FormatListBulletedIcon sx={{ fontSize: "64px", color: "#ddd"}} />
              </Box>
              <Typography >Gestiona y controla los tu personal subiendo sus datos aqui </Typography>
              <Typography variant="caption" sx={{ mb: 2}}>Descarga la plantilla, rellenala con la informacion de tu personal y carga en NeoCarnets</Typography>
              <MUIModal buttonName="Cargar personas" icon={<PersonAddIcon />}>
                <ContentModal />
              </MUIModal>
          </Box>
        )
        : 
        (
          <>
            <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{fontSize: 11, mb: 1}}>
              <AppLink path="/dashboard/carnets" label="Carnets" />
              <Typography color="text.primary">{ activeCarnet.title }</Typography>
            </Breadcrumbs>
            <Alert 
              // action={
              //   <IconButton
              //     aria-label="close"
              //     color="inherit"
              //     size="small"
              //     onClick={() => {
              //       setOpen(false);
              //     }}
              //   >
              //     <CloseIcon fontSize="inherit" />
              //   </IconButton>
              // }
              severity="info"
            >
              <AlertTitle>Información</AlertTitle>
              En esta sección puedes agregar a tus empleados <strong>¡solo subiendo un CSV!</strong>
            </Alert>
            <Grid container sx={{ justifyContent: "flex-end", alignItems: "flex-end", my: 2 }}>
              <Grid>
                
                <AppLink path="/dashboard/editor" >
                  <Button size="small" variant="contained" color="primary" sx={{py:1}}>
                    <AddCardIcon />
                    Crear y editar carnet
                  </Button>
                </AppLink>
                &nbsp;
                <Button variant="contained" onClick={handleOpen} startIcon={<PersonAddIcon />}>
                  Cargar Personas
                </Button>
                <MUIModal handleClose={handleClose} open={open}>
                  <ContentModal />
                </MUIModal>
              </Grid>
            </Grid>
            <MUIDataTable title={'Personas en el sistema'} data={personsByCarnetid} columns={columns} options={options} />
          </>
        )
      }
    </DashboardLayout>
  );
}