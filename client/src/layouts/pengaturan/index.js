/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import MDButton from "components/MDButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshToken } from "store/slice/authThunk";
import { jwtDeccode } from "utils/jwtDecode";
import { useEffect } from "react";

function createData(name, content) {
  return { name, content };
}

const row = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

function Pengaturan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = async () => {
      const auth = await dispatch(refreshToken());
      if (auth.payload.status === "success") {
        const jwt = jwtDeccode(auth.payload.token);
        if (jwt.role !== "admin") {
          console.log(jwt);
          return navigate("/login");
        }
      } else {
        return navigate("/login");
      }
    };
    checkLogin();
  }, []);
  const TableCoy = ({ rows }) => {
    return (
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((_row) => (
            <TableRow key={_row.name}>
              <TableCell component="th" scope="row">
                {_row.name}
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" size="small">
                  <EditIcon fontSize="inherit" color="warning" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <MDBox sx={{ display: "flex", flexDirection: "column" }} alignItems="center" p={3}>
                <MDTypography variant="h6" gutterBottom>
                  Admin
                </MDTypography>
                <MDButton fullWidth color="info">
                  <AddIcon />
                </MDButton>
                <TableCoy rows={row} />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <MDBox sx={{ display: "flex", flexDirection: "column" }} alignItems="center" p={3}>
                <MDTypography variant="h6" gutterBottom>
                  Kelas
                </MDTypography>
                <MDButton fullWidth color="info">
                  <AddIcon />
                </MDButton>
                <TableCoy rows={row} />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <MDBox
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                alignItems="center"
                p={3}
              >
                <MDTypography variant="h6" gutterBottom>
                  Sekolah
                </MDTypography>
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  id="outlined-basic"
                  label="Nama Sekolah"
                  variant="outlined"
                />
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  id="outlined-basic"
                  label="Telepon"
                  variant="outlined"
                />
                <TextField
                  sx={{ mb: 1 }}
                  fullWidth
                  id="outlined-basic"
                  label="Alamat"
                  variant="outlined"
                />
                <MDButton fullWidth color="info">
                  Simpan
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Pengaturan;
