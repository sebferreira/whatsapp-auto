import * as React from "react";
import {useEffect, useState} from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  Paper,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import {getClientes} from "../../queryFn/query";

const columns = [
  {field: "id_chat", headerName: "Teléfono", width: 150},
  {field: "nombre", headerName: "Nombre", width: 130},
  {field: "apellido", headerName: "Apellido", width: 130},
  {
    field: "dni",
    headerName: "DNI",
    width: 120,
  },
  {
    field: "categoria",
    headerName: "Categoría",
    width: 120,
    renderCell: (params) => {
      const color =
        params.value === "ventas"
          ? "green"
          : params.value === "compras"
          ? "blue"
          : "orange";
      return (
        <span
          style={{
            color: color,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}>
          {params.value}
        </span>
      );
    },
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ClientsPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClients = async () => {
      try {
        const result = await getClientes();

        if (result) setData(result);
      } catch (error) {
        console.error("Error cargando clientes", error);
      } finally {
        setLoading(false);
      }
    };
    getClients();
  }, []);

  const filasFiltradas = data.filter((row) => {
    if (filtro === "Todos") return true;
    return row.categoria?.toLowerCase() === filtro.toLowerCase();
  });


  return (
    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mb: 3,
          gap: 2,
        }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Clientes Registrados
        </Typography>

        <Box sx={{minWidth: 200}}>
          <FormControl fullWidth size="small">
            <InputLabel
              id="filtro-label"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&.Mui-focused": {color: "#90caf9"},
              }}>
              Filtrar por Categoría
            </InputLabel>

            <Select
              labelId="filtro-label"
              value={filtro}
              label="Filtrar por Categoría"
              onChange={(e) => setFiltro(e.target.value)}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#90caf9",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}>
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="ventas">Ventas</MenuItem>
              <MenuItem value="compras">Compras</MenuItem>
              <MenuItem value="pagos">Pagos</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Paper
        elevation={3}
        sx={{
          height: {xs: "400px", md: 500},
          width: {xs: "-webkit-fill-available", md: "100%"},
          p: 2,
        }}>
        <DataGrid
          rows={filasFiltradas}
          columns={columns}
          getRowId={(row) => row.id_cliente}
          loading={loading}
          initialState={{
            pagination: {paginationModel: {pageSize: 10}},
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontSize: "1rem",
            },
          }}
        />
      </Paper>
    </Container>
  );
}
