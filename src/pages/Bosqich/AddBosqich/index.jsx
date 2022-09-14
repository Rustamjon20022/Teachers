import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Alert,
	Button,
	Container,
	Grid,
	Snackbar,
	TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Box, Card, Typography } from "@mui/material/node";

export default () => {
	let history = useNavigate();
	const back = () => {
		history("/bosqich");
	};
	const [title, setTitle] = useState("");
	const [describe, setDesc] = useState("");

	console.log(title, describe);

	const sendDataToAPI = () => {
		const data = {
			title: title,
			desc: describe,
		};
		console.log(data);
		axios.post("http://localhost:8080/api/steps", data).then(() => {
			history("/bosqich");
			setTitle("");
			setDesc("");
		});
	};

	return (
		<Card sx={{ mt: "1%", pb: "5%" }}>
			<Container maxWidth="md">
				<Typography sx={{ marginY: 5 }} variant="h4">
					Bosqich malumotlarini qo`shish
				</Typography>
				{/* Inputs Operations */}
				<Grid container columns={12} spacing={4}>
					<Grid item xs={12} md={12} lg={6} xl={6}>
						<TextField
							type="text"
							label="Bosqich"
							id="outlined-basic"
							sx={{ width: "100%" }}
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							variant="outlined"
						/>
					</Grid>

					<Grid item xs={12} md={12} lg={6} xl={6}>
						<TextField
							type="text"
							id="input-with-icon-textfield1"
							label="Malumot"
							sx={{ width: "100%" }}
							onChange={(e) => setDesc(e.target.value)}
							value={describe}
							variant="outlined"
						/>
					</Grid>
				</Grid>
				{/* Inputs Operations End */}

				{/* Button Operations */}

				<Box
					sx={{
						my: "2%",
						width: "100%",
						display: "flex",
						justifyContent: "end",
						gap: 2,
					}}
				>
					<Button
						onClick={back}
						id="statusOffGR"
						sx={{
							backgroundColor: "green",
							px: "3%",
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
						id="statusGR"
						onClick={sendDataToAPI}
						sx={{
							px: "3",

							backgroundColor: "green",
							color: "#fff",
							":hover": {
								backgroundColor: "green",
								color: "#fff",
							},
						}}
					>
						Qo`shish
					</Button>
				</Box>
				{/* Button Operations */}
			</Container>
		</Card>
	);
};
