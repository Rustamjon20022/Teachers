import { Box, Card, Grid, Typography } from "@mui/material";
import { CardActionArea, CardContent } from "@mui/material/node";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import get from "../../services/attendance";
import "./attendance.css";

const Davomat = () => {
	const [Data, setData] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		get.getGroups().then((resp) => {
			setData(resp);
		});
	};

	const handleNavigate = (id) => {
		navigate("/davomat/table", { state: id });
	};

	return (
		<Box>
			<Navbar title="Davomat" />
			<Grid container columns={12} spacing={5}>
				{Data.map((val, ind) => (
					<Grid key={ind} item xs={12} md={6} lg={4}>
						<Card
							// className="attendance-card"
							onClick={() => handleNavigate(val.id)}
							// sx={{
							// 	display: "flex",
							// 	justifyContent: "center",
							// 	alignItems: "center",
							// 	flexDirection: "column",
							// 	height: "150px",
							// 	gap: 2,
							// }}
							sx={{
								display: "flex",
								alignItems: "center",
								textAlign: "center",

								gap: 2,
							}}
						>
							<CardActionArea>
								<CardContent>
									<Typography
										sx={{ color: "gray", fontWeight: "bold", py: "5%" }}
										// className="attendance-text"
									>
										Guruh nomi: {val.title}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Davomat;
