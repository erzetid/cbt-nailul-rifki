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
import { useState } from "react";

const apiContoh = {
  _id: "62054fced9d1b9d18bed6394",
  dataSoal: [
    {
      no: 1,
      _id: "62054fced9d1b9d18bed6395",
    },
    {
      no: 2,
      _id: "62054fced9d1b9d18bed639b",
    },
    {
      no: 3,
      _id: "62054fced9d1b9d18bed63a1",
    },
    {
      no: 4,
      _id: "62054fced9d1b9d18bed63a7",
    },
    {
      no: 5,
      _id: "62054fced9d1b9d18bed63ad",
    },
    {
      no: 6,
      _id: "62054fced9d1b9d18bed63b3",
    },
    {
      no: 7,
      _id: "62054fced9d1b9d18bed63b9",
    },
    {
      no: 8,
      _id: "62054fced9d1b9d18bed63bf",
    },
    {
      no: 9,
      _id: "62054fced9d1b9d18bed63c5",
    },
    {
      no: 10,
      _id: "62054fced9d1b9d18bed63cb",
    },
    {
      no: 11,
      _id: "62054fced9d1b9d18bed63d1",
    },
    {
      no: 12,
      _id: "62054fced9d1b9d18bed63d7",
    },
    {
      no: 13,
      _id: "62054fced9d1b9d18bed63dd",
    },
    {
      no: 14,
      _id: "62054fced9d1b9d18bed63e3",
    },
    {
      no: 15,
      _id: "62054fced9d1b9d18bed63e9",
    },
    {
      no: 16,
      _id: "62054fced9d1b9d18bed63ef",
    },
    {
      no: 17,
      _id: "62054fced9d1b9d18bed63f5",
    },
    {
      no: 18,
      _id: "62054fced9d1b9d18bed63fb",
    },
    {
      no: 19,
      _id: "62054fced9d1b9d18bed6401",
    },
    {
      no: 20,
      _id: "62054fced9d1b9d18bed6407",
    },
  ],
};

const contohPerSoal = {
  soal: "Suatu tindakan yang membuat kita nyaman?",
  pilihan: [
    {
      opsi: "Membaca",
      _id: "62054fced9d1b9d18bed6396",
    },
    {
      opsi: "Menulis",
      _id: "62054fced9d1b9d18bed6397",
    },
    {
      opsi: "Memancing",
      _id: "62054fced9d1b9d18bed6398",
    },
    {
      opsi: "Melamun",
      _id: "62054fced9d1b9d18bed6399",
    },
    {
      opsi: "Tidur",
      _id: "62054fced9d1b9d18bed639a",
    },
  ],
  jawaban: "",
  _id: "62054fced9d1b9d18bed6395",
};

function ManageSoal() {
  const [valueOpsi, setValueOpsi] = useState(null);
  const [btnAktif, setBtnAktif] = useState(null);

  const btnSoal = apiContoh.dataSoal.map((item) => {
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

  const clickBtnColor = (e) => {
    console.error(e.target.name);
    setBtnAktif(e.target.name);
  };
  const handleChangeOpsi = (event) => {
    setValueOpsi(event.target.value);
  };

  const opsiSoal = contohPerSoal.pilihan.map((x) => {
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
                  Soal Matematika
                </MDTypography>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    {btnSoal}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RichEditorExample
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {opsiSoal}
                  </Grid>
                </Grid>
              </MDBox>
              <MDButton sx={{ margin: 2 }} color="info">
                Simpan
              </MDButton>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ManageSoal;
