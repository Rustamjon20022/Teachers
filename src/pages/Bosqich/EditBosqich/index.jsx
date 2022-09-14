import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import {
	Card,
	Container,
	Grid,
	Button,
	Typography,
	Box,
} from "@mui/material/node";
import { useNavigate, useLocation } from "react-router";

const Edit = () => {
	let history = useNavigate();

	const { state } = useLocation();
	const [title, setTitle] = useState("");
	const [describe, setDesc] = useState("");

	React.useEffect(() => {
		getdata();
	}, []);

	const getdata = () => {
		axios.get(`http://localhost:8080/api/steps/${state.id}`).then((resp) => {
			setTitle(resp.data.title);
			setDesc(resp.data.desc);
		});
	};

	const Submit = () => {
		const data = {
			title: title,
			desc: describe,
		};
		axios
			.put(`http://localhost:8080/api/steps/${state.id}`, data)
			.then(() => {
				history("/bosqich", { replace: true });
				setTitle("");
				setDesc("");
			})
			.catch((err) => console.log(err));
	};

	return (
		<Card sx={{ paddingBottom: 50, mt: "1%", pb: "5%" }}>
			<Container maxWidth="md">
				<Typography sx={{ marginY: 5 }} variant="h4">
					Bosqich malumotlarini tahrirlash
				</Typography>
				{/* Input Operations */}
				<Grid container columns={12} spacing={4}>
					<Grid
						item
						xs={12}
						md={12}
						lg={6}
						xl={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						<TextField
							id="outlined-basic"
							label="Bosqich"
							sx={{ width: "100%" }}
							onChange={(e) => setTitle(e.target.value)}
							value={title}
							variant="outlined"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={12}
						lg={6}
						xl={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						<TextField
							type="text"
							label="Malumot"
							sx={{ width: "100%" }}
							onChange={(e) => setDesc(e.target.value)}
							value={describe}
							variant="outlined"
						/>
					</Grid>
				</Grid>
				{/* Input Operations End */}

				{/*  Button Operations  */}

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
						onClick={() => history("/bosqich")}
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
						onClick={Submit}
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
						Tahrirlash
					</Button>
				</Box>
				{/*  Button Operations End  */}
			</Container>
		</Card>
	);
};
export default Edit;
