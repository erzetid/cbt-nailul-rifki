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
import MuiAlert from "@mui/material/Alert";
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
import { Snackbar, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "store/slice/authThunk";
import { jwtDeccode } from "utils/jwtDecode";
import { forwardRef, useEffect, useState } from "react";
import { getKelas, postKelas } from "store/slice/kelasThunk";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { putKelas } from "store/slice/kelasThunk";

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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const emptyKelas = {
  nama: "",
  _id: "",
};

function Pengaturan() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState(null);
  const [titleKelasDialog, setTitleKelasDialog] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [kelasDialog, setKelasDialog] = useState(false);
  const [kelasValue, setKelasValue] = useState("");
  const [statusKelas, setStatusKelas] = useState(null);
  const [kelasArray, setKelasArray] = useState([]);
  const [putDataKelas, setPutDataKelas] = useState(emptyKelas);
  const [tipeDialogKelas, setTipeDialogKelas] = useState("tambah");

  useEffect(() => {
    const checkLogin = async () => {
      const auth = await dispatch(refreshToken());
      const data = await dispatch(getKelas());
      setKelasArray(data.payload.data);
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
  }, [token]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const openKelasDialog = (title, data) => {
    setTitleKelasDialog(title);

    if (title == "Tambah Kelas") {
      setKelasValue("");
      setTipeDialogKelas("tambah");
    } else {
      setKelasValue(data.nama);
      setPutDataKelas(data);
      setTipeDialogKelas("edit");
    }
    setKelasDialog(true);
  };
  const closeKelasDialog = () => setKelasDialog(false);
  const onClickTmbhKelas = async () => {
    let clickKelas;
    await dispatch(refreshToken());
    if (tipeDialogKelas === "tambah") {
      clickKelas = await dispatch(postKelas({ nama: kelasValue }));
    } else {
      clickKelas = await dispatch(putKelas({ _id: putDataKelas._id, nama: kelasValue }));
    }
    if (clickKelas.payload.status === "success") setKelasDialog(false);
    setStatusKelas(clickKelas.payload.status);
    setMsg(clickKelas.payload.message);
    setOpenAlert(true);
  };

  const TableKelas = ({ rows }) => {
    return (
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((_row) => (
            <TableRow key={_row.nama}>
              <TableCell component="th" scope="row">
                {_row.nama}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => openKelasDialog("Edit kelas", { nama: _row.nama, _id: _row._id })}
                  aria-label="edit"
                  size="small"
                >
                  <EditIcon fontSize="inherit" color="warning" />
                </IconButton>
                {/* <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" color="error" />
                </IconButton> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  const TableCoy = ({ rows }) => {
    return (
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((_row) => (
            <TableRow key={_row.nama}>
              <TableCell component="th" scope="row">
                {_row.nama}
              </TableCell>
              <TableCell align="right">
                {/* <IconButton aria-label="delete" size="small">
                  <EditIcon fontSize="inherit" color="warning" />
                </IconButton> */}
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
                <MDButton onClick={() => openKelasDialog("Tambah Kelas")} fullWidth color="info">
                  <AddIcon />
                </MDButton>
                <TableKelas rows={kelasArray} />
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
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={statusKelas} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      <Dialog open={kelasDialog} onClose={closeKelasDialog} fullWidth={true} maxWidth="xs">
        <DialogTitle>{titleKelasDialog}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nam"
            label="Nama kelas"
            type="text"
            fullWidth
            variant="standard"
            value={kelasValue}
            onChange={(e) => setKelasValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <MDButton color="error" onClick={closeKelasDialog}>
            Batal
          </MDButton>
          <MDButton onClick={onClickTmbhKelas}>Simpan</MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Pengaturan;
