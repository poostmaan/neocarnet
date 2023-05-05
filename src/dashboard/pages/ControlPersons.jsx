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
    responsive: 'vertical',
    rowsPerPage: 10,
    selectableRows: false,
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
    <DashboardLayout>
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



  // export default Example;
}

// export function ControlPersons() {

//   const [filename, setFilename] = useState("");

//   const handleInputFile = (e) => {

//     if (!e.target.files) {
//       return;
//     }

//     const file = e.target.files[0];
//     const { name } = file;
//     setFilename('Nombre del archivo: ' + name);
//   }

//   const columns = [
//     {
//       name: 'Title',
//       selector: row => row.title,
//     },
//     {
//       name: 'Year',
//       selector: row => row.year,
//       sortable: true
//     },
//   ];
//   const data = [
//     {
//       id: 1,
//       title: 'Beetlejuice',
//       year: '1988',
//     },
//     {
//       id: 2,
//       title: 'Ghostbusters',
//       year: '1984',
//     },
//     {
//       id: 3,
//       title: 'Beetlejuice',
//       year: '1988',
//     },
//     {
//       id: 4,
//       title: 'Ghostbusters',
//       year: '1984',
//     },
//     {
//       id: 5,
//       title: 'Beetlejuice',
//       year: '1988',
//     },
//     {
//       id: 6,
//       title: 'Ghostbusters',
//       year: '1984',
//     },
//     {
//       id: 7,
//       title: 'Beetlejuice',
//       year: '1988',
//     },
//     {
//       id: 8,
//       title: 'Ghostbusters',
//       year: '1984',
//     },
//     {
//       id: 9,
//       title: 'Beetlejuice',
//       year: '1988',
//     },
//     {
//       id: 10,
//       title: 'Ghostbusters',
//       year: '1984',
//     },
//     {
//       id: 11,
//       title: 'Beetlejuice',
//       year: '1988',
//     }
//   ];

//   function convertArrayOfObjectsToCSV(array) {
//     let result;

//     const columnDelimiter = ',';
//     const lineDelimiter = '\n';
//     const keys = Object.keys(data[0]);

//     result = '';
//     result += keys.join(columnDelimiter);
//     result += lineDelimiter;

//     array.forEach(item => {
//       let ctr = 0;
//       keys.forEach(key => {
//         if (ctr > 0) result += columnDelimiter;

//         result += item[key];
//         // eslint-disable-next-line no-plusplus
//         ctr++;
//       });
//       result += lineDelimiter;
//     });

//     return result;
//   }

//   // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
//   function downloadCSV(array) {
//     const link = document.createElement('a');
//     let csv = convertArrayOfObjectsToCSV(array);
//     if (csv == null) return;

//     const filename = 'export.csv';

//     if (!csv.match(/^data:text\/csv/i)) {
//       csv = `data:text/csv;charset=utf-8,${csv}`;
//     }

//     link.setAttribute('href', encodeURI(csv));
//     link.setAttribute('download', filename);
//     link.click();
//   }

//   // eslint-disable-next-line react/prop-types
//   const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;

//   const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleRowsPerPageChange = (rowsPerPage) => {
//     setRowsPerPage(rowsPerPage);
//     setCurrentPage(1);
//   };

//   const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <DashboardLayout>

//       <DataTable
//         columns={columns}
//         data={paginatedData}
//         actions={actionsMemo}
//         subHeader
//         subHeaderAlign="right"
//       />
//       <CustomMaterialPagination
//         totalRows={data.length}
//         rowsPerPage={rowsPerPage}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//         onRowsPerPageChange={handleRowsPerPageChange}
//       />
//     </DashboardLayout>
//   );
// }