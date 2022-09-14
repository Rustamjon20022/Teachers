import React from "react";
import { Container } from "../components/Content/style";
import Content from "../components/Content";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";

export default () => {
  return (
    <Container sx={{ p: 0 }}>
      <Content />
    </Container>
  );
};
