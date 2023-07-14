import { DashboardLayout } from '../layouts';
import React, { useState } from "react";
import { Grid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MUIDataTable from 'mui-datatables';
import { useAuthStore, usePersons } from '../../hooks';
import MUIModal from '../components/MuiModal';
import ContentModal from '../components/ContentModal';


const theme = createTheme();

export function ControlPersons() {

  const { bussinessPersons } = usePersons();

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
      label: "Correo electrónico"
    }
  ];

  console.log(bussinessPersons);


  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: 10,
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
    <DashboardLayout nameModule={"Personas"}>
      <Grid container sx={{ justifyContent: "flex-end", alignItems: "flex-end", mb: 2 }}>
        <Grid>
          <MUIModal buttonName="Cargar personas" icon={<PersonAddIcon />}>
            <ContentModal />
          </MUIModal>
        </Grid>
      </Grid>
      <MUIDataTable title={'Personas en el sistema'} data={bussinessPersons} columns={columns} options={options} />
    </DashboardLayout>
  );
}