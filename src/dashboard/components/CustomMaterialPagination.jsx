import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import { useMediaQuery } from '@mui/material';

const CustomMaterialPagination = ({ totalRows, rowsPerPage, currentPage, onPageChange, onRowsPerPageChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = useState(currentPage - 1);
    const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChange(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPageState(newRowsPerPage);
        onRowsPerPageChange(newRowsPerPage);
        setPage(0);
    };

    return (
        <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPageState}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage={isMobile ? '' : 'Rows per page:'}
        />
    );
};

CustomMaterialPagination.propTypes = {
    totalRows: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,
};

export default CustomMaterialPagination;