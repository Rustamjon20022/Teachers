import {
	Box,
	Card,
	Grid,
	Typography,
	CardContent,
	CardActionArea,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import get from "../../services/Tolov";
// import "./attendance.css";

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
		navigate("/tolov/guruhlar", { state: id });
	};

	return (
		<Box>
			<Navbar title="To`lov" />
			<Grid container columns={12} spacing={5}>
				{Data.map((val, ind) => (
					<Grid key={ind} item xs={12} md={6} lg={4}>
						<Card
							sx={{
								display: "flex",
								alignItems: "center",
								textAlign: "center",

								gap: 2,
							}}
							onClick={handleNavigate}
						>
							<CardActionArea>
								<CardContent>
									<Typography
										sx={{ color: "gray", fontWeight: "bold", py: "5%" }}
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
