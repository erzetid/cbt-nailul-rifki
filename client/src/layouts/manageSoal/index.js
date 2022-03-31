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

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import MDButton from "components/MDButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RichEditorExample from "components/Draft/Draft";
import MDInput from "components/MDInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDeccode } from "utils/jwtDecode";
import { refreshToken } from "store/slice/authThunk";
import { getSoalById } from "store/slice/soalThunk";
import { getPerSoalById } from "store/slice/soalThunk";
import { editPertanyaan } from "store/slice/soalThunk";
import { change } from "store/slice/draftJs";

const ManageSoal = () => {
  const [valueOpsi, setValueOpsi] = useState(null);
  const [btnAktif, setBtnAktif] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [soal, setSoal] = useState({ dataSoal: [], _id: "", nama: "" });
  const { token } = useSelector((state) => state.auth);
  const [perSoal, setPerSoal] = useState({ soal: "", pilihan: [], _id: "customId123" });
  const { value } = useSelector((state) => state.draftJs);
  const [data, setData] = useState(value);

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const checkLogin = async () => {
      const auth = await dispatch(refreshToken());
      const _soal = await dispatch(getSoalById(searchParams.get("id_soal")));
      setSoal(_soal.payload.data);
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
  const makeid = (length) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const btnSoal = soal.dataSoal.map((item) => {
    return (
      <MDButton
        size="small"
        variant="contained"
        onClick={(e) => clickBtnColor(e)}
        sx={{
          margin: 0.1,
        }}
        color={btnAktif === item._id ? "success" : "secondary"}
        name={item._id}
      >
        {item.no}
      </MDButton>
    );
  });

  const clickBtnColor = async (e) => {
    await dispatch(refreshToken());
    const _perSoal = await dispatch(getPerSoalById(e.target.name));
    console.log(_perSoal.payload.data.soal);
    dispatch(change(_perSoal.payload.data.soal));
    setPerSoal(_perSoal.payload.data);
    setBtnAktif(e.target.name);
  };
  const handleChangeOpsi = (event) => {
    setValueOpsi(event.target.value);
  };

  const simpanSoal = async () => {
    await dispatch(refreshToken());
    await dispatch(editPertanyaan({ pertanyaan: value, _id: btnAktif }));
  };

  const opsiSoal = perSoal.pilihan.map((x) => {
    return (
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={valueOpsi}
        onChange={(e) => handleChangeOpsi(e)}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <FormControlLabel value={x._id} control={<Radio />} label={x._id} />
          </AccordionSummary>
          <AccordionDetails>
            <MDInput fullWidth value={x.opsi} />
          </AccordionDetails>
        </Accordion>
      </RadioGroup>
    );
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox sx={{ display: "flex", flexDirection: "column" }} alignItems="center" p={3}>
                <MDTypography variant="h6" gutterBottom>
                  {soal.nama}
                </MDTypography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    {btnSoal}
                  </Grid>
                  <Grid key={perSoal._id} item xs={12} md={6}>
                    <RichEditorExample />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {opsiSoal}
                  </Grid>
                </Grid>
              </MDBox>
              <MDButton onClick={simpanSoal} sx={{ margin: 2 }} color="info">
                Simpan
              </MDButton>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ManageSoal;
