import React from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { publicRoutes, dashboardRoutes } from "../routes/index";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sayidbar from "../components/Sayidbar";
import { Box, Grid } from "@mui/material";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	const { token } = useSelector((state) => state.authReducer);
	// const content = useRoutes(routes);
	const content = useRoutes(!token ? dashboardRoutes : publicRoutes);

	return (
		<Box sx={{ width: "100%" }}>
			<Grid container sx={{}}>
				<Grid
					lg={2}
					xs={0}
					sm={0}
					md={0}
					item
					sx={{
						display: { xs: "none", sm: "none", lg: "flex", md: "none" },
						justifyContent: "start",
					}}
				>
					<Sayidbar />
				</Grid>

				<Grid
					lg={10}
					xs={12}
					sm={12}
					md={12}
					item
					id="pages"
					sx={{
						height: "100vh",

						overflowY: "scroll",
						msOverflowStyle: "none",
						scrollbarWidth: "none",
						"::-webkit-scrollbar": {
							display: "none",
						},
						pb: "30px",
						px: "1vw",
					}}
				>
					{content}
				</Grid>
			</Grid>
		</Box>
	);
};
