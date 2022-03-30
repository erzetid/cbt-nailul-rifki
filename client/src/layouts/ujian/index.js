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
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useDispatch } from "react-redux";
import { refreshToken } from "store/slice/authThunk";
import { jwtDeccode } from "utils/jwtDecode";

function Ujian() {
  const [menu, setMenu] = useState(null);
  const [dialogSoal, setDialogSoal] = useState(false);
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
  const NamaUjian = ({ nama }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {nama}
      </MDTypography>
    </MDBox>
  );
  const { columns, rows } = {
    columns: [
      { Header: "Nama Ujian", accessor: "namaUjian", width: "15%", align: "left" },
      { Header: "Kelas", accessor: "kelas", align: "left" },
      { Header: "Durasi", accessor: "durasi", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "waktu", accessor: "waktu", align: "center" },
      { Header: "aksi", accessor: "aksi", align: "right" },
    ],
    rows: [
      {
        namaUjian: <NamaUjian nama={"Ujian Matematika XII TSM2"} />,
        kelas: "XII TSM2",
        durasi: "90 Menit",
        status: <MDBadge badgeContent="aktif" size="xs" container />,
        waktu: <MDTypography sx={{ fontSize: "inherit" }}>20/10/2022 19:20-20.20</MDTypography>,
        aksi: (
          <>
            <MDButton size="small" variant="contained" color="secondary" sx={{ marginRight: 0.2 }}>
              OFF
            </MDButton>
            <MDButton size="small" variant="contained" color="primary">
              Hapus
            </MDButton>
          </>
        ),
      },
      {
        namaUjian: <NamaUjian nama={"Ujian Bahas Indonesia XII TSM2"} />,
        kelas: "XII TSM2",
        durasi: "120 Menit",
        status: <MDBadge badgeContent="nonaktif" color="primary" size="xs" container />,
        waktu: <MDTypography sx={{ fontSize: "inherit" }}>21/10/2022 19:20-21.20</MDTypography>,
        aksi: (
          <>
            <MDButton size="small" variant="contained" color="secondary" sx={{ marginRight: 0.2 }}>
              ON
            </MDButton>
            <MDButton size="small" variant="contained" color="primary">
              Hapus
            </MDButton>
          </>
        ),
      },
    ],
  };

  const openDialogSoal = () => {
    setDialogSoal(true);
  };
  const closeDialogSoal = () => {
    setDialogSoal(false);
  };

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => openDialogSoal()}>Buat</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <MDBox>
                  <MDTypography variant="h6" gutterBottom>
                    Data Ujian
                  </MDTypography>
                </MDBox>
                <MDBox color="text" px={2}>
                  <Icon
                    sx={{ cursor: "pointer", fontWeight: "bold" }}
                    fontSize="small"
                    onClick={openMenu}
                  >
                    more_vert
                  </Icon>
                </MDBox>
                {renderMenu}
              </MDBox>
              <MDBox>
                <DataTable
                  table={{ columns, rows }}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                  entriesPerPage={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Dialog fullWidth maxWidth={"xs"} open={dialogSoal} onClose={closeDialogSoal}>
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <MDBox
            fullWidth
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              mt: 1,
            }}
          >
            <MDInput label="Nama Soal" error={true} sx={{ mb: 1 }} />
            <MDInput label="Jumlah" type="number" error={true} />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closeDialogSoal}>Tutup</MDButton>
          <MDButton onClick={closeDialogSoal}>Simpan</MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Ujian;
