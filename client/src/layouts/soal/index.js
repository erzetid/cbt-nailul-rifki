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
import { refreshToken } from "store/slice/authThunk";
import { jwtDeccode } from "utils/jwtDecode";
import { useDispatch } from "react-redux";

function Soal() {
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

  const IdSoal = ({ id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {id}
      </MDTypography>
    </MDBox>
  );
  const { columns, rows } = {
    columns: [
      { Header: "Kode Soal", accessor: "kodeSoal", width: "15%", align: "left" },
      { Header: "Nama soal", accessor: "namaSoal", width: "30%", align: "left" },
      { Header: "Jumlah Soal", accessor: "jumlahSoal", align: "center" },
      { Header: "Diperbarui", accessor: "diperbarui", align: "center" },
      { Header: "aksi", accessor: "aksi", align: "center" },
    ],
    rows: [
      {
        kodeSoal: <IdSoal id={"62054fced9d1b9d18bed6394"} />,
        namaSoal: "Matematika XII TSM2",
        jumlahSoal: <MDBadge badgeContent="20 butir" size="xs" container />,
        diperbarui: <MDTypography sx={{ fontSize: "inherit" }}>20/10/2022 19:20</MDTypography>,
        aksi: (
          <>
            <Icon
              sx={{ cursor: "pointer", mr: 1 }}
              onClick={() => navigate("/manage_soal")}
              color="success"
              fontSize="small"
            >
              visibility
            </Icon>
            <Icon sx={{ cursor: "pointer" }} color="error" fontSize="small">
              delete_forever
            </Icon>
          </>
        ),
      },
      {
        kodeSoal: <IdSoal id={"62054fced9d1b9d18be5555"} />,
        namaSoal: "Bahas Indonesia XII TSM2",
        jumlahSoal: <MDBadge badgeContent="20 butir" size="xs" container />,
        diperbarui: <MDTypography sx={{ fontSize: "inherit" }}>21/10/2022 19:20</MDTypography>,
        aksi: (
          <>
            <Icon sx={{ cursor: "pointer", mr: 1 }} color="success" fontSize="small">
              visibility
            </Icon>
            <Icon sx={{ cursor: "pointer" }} color="error" fontSize="small">
              delete_forever
            </Icon>
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
                    Data Soal
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

export default Soal;
