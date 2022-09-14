import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";

export default () => {
  const navigate = useNavigate();
  const { state: fanId } = useLocation();

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
    },
    onSubmit: (values) => {
      if (fanId) {
        axios
          .put(`http://localhost:8080/api/subjects/${fanId}`, values)
          .then(() => {
            navigate("/fanlar", { replace: true });
          })
          .catch((err) => console.log(err));
      } else {
        axios.post("http://localhost:8080/api/subjects", values).then(() => {
          navigate("/fanlar");
        });
      }
    },
  });
  useEffect(() => {
    if (fanId) {
      getdata();
    }
  }, []);
  const getdata = () => {
    axios.get(`http://localhost:8080/api/subjects/${fanId}`).then((resp) => {
      formik.setValues({
        ...formik.values,
        title: resp.data.title,
        desc: resp.data.desc,
      });
    });
  };

  const data = [
    {
      id: "title",
      placeholder: "Fan",
      name: "title",
      type: "text",
      value: formik.values.title,
    },
    {
      id: "desc",
      placeholder: "Ma'lumot",
      name: "desc",
      type: "text",
      value: formik.values.desc,
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ p: "5%" }}>
        <Typography variant="h4" sx={{}}>
          {fanId ? "Tahririlash" : "Fanlar qo'shish"}
        </Typography>
        <Grid container>
          {data.map((fan, idx) => (
            <Grid
              key={idx}
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{ mt: 2 }}
            >
              <TextField
                label={fan.placeholder}
                id={fan.id}
                name={fan.name}
                type={fan.type}
                onChange={formik.handleChange}
                value={fan.value}
                sx={{
                  width: "90%",
                }}
              />
            </Grid>
          ))}
          <Box
            sx={{
              mt: 2,
              width: "95%",
              display: "flex",
              justifyContent: "end",
              gap: 2,
            }}
          >
            <Button
              onClick={() => navigate("/fanlar")}
              id="statusOffGR"
              sx={{
                backgroundColor: "green",
                px: "2%s",
                color: "#fff",
                ":hover": {
                  backgroundColor: "green",
                  color: "#fff",
                },
              }}
            >
              Bekor qilish
            </Button>
            <Button
              type="Submit"
              sx={{
                backgroundColor: "green",
                px: "8%",
                py: "1%",
                color: "#fff",
                ":hover": {
                  backgroundColor: "green",
                  color: "#fff",
                },
              }}
            >
              {fanId ? "Yanglash" : "Qo'shish"}
            </Button>
          </Box>
        </Grid>
      </Card>
    </form>
  );
};
