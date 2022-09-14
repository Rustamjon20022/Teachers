import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export default () => {
	return (
		<div style={{ width: "100%" }}>
			<Grid container>
				<Grid item lg={12} xs={12} sm={12} md={12}>
					<Box
						sx={{
							width: "100%",

							color: "#7F7F7F",
							py: "0.5%",
							px: "1.2%",
						}}
					>
						<Typography fontSize="15px" sx={{ textAlign: "center" }}>
							Copyright © 2084 Your Company Name
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};
