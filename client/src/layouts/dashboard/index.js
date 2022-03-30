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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Pengumuman from "layouts/dashboard/components/Pengumuman";
import LogAktifitas from "layouts/dashboard/components/LogAktifitas";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshToken } from "store/slice/authThunk";
import { useEffect } from "react";
import { jwtDeccode } from "../../utils/jwtDecode";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard color="dark" icon="person" title="Siswa" count={281} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard icon="article" title="Soal" count="2,300" />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard color="success" icon="quiz" title="Ujian" count="34k" />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Pengumuman />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <LogAktifitas />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
