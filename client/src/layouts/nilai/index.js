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
import { useState } from "react";
import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function Nilai() {
  const navigate = useNavigate();

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
      { Header: "Selesai Ujian", accessor: "selesai", align: "center" },
      { Header: "aksi", accessor: "aksi", align: "center" },
    ],
    rows: [
      {
        namaUjian: <NamaUjian nama={"62054fced9d1b9d18bed6394"} />,
        kelas: "XII TSM2",
        jumlahSoal: <MDBadge badgeContent="20 butir" size="xs" container />,
        selesai: <MDTypography sx={{ fontSize: "inherit" }}>20/10/2022 19:20</MDTypography>,
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
          </>
        ),
      },
      {
        namaUjian: <NamaUjian nama={"62054fced9d1b9d18be5555"} />,
        kelas: "XII TSM2",
        jumlahSoal: <MDBadge badgeContent="20 butir" size="xs" container />,
        selesai: <MDTypography sx={{ fontSize: "inherit" }}>21/10/2022 19:20</MDTypography>,
        aksi: (
          <>
            <Icon sx={{ cursor: "pointer", mr: 1 }} color="success" fontSize="small">
              visibility
            </Icon>
          </>
        ),
      },
    ],
  };

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
                    Data Nilai
                  </MDTypography>
                </MDBox>
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
    </DashboardLayout>
  );
}

export default Nilai;
