import { Box, CircularProgress } from "@mui/material"

export const Loading = () => {
  return (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    }}
    >
        <CircularProgress />
    </Box>
  )
}
