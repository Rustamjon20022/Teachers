import React from "react";
import { Outlet } from "react-router-dom";
import { Content } from "./style";

export default () => {
  return (
    <Content>
      <Outlet />
    </Content>
  );
};
