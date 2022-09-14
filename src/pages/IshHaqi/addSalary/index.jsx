import React, { useState } from "react";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import {
	Card,
	Container,
	Typography,
	Grid,
	Button,
	Box,
	TextField,
	InputLabel,
	Select,
	FormControl,
	MenuItem,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

const Add = () => {
	let history = useNavigate();
	const [percentData, setPercentData] = useState([]);

	const [type, setType] = useState("");
	const [percent, setPercent] = useState();
	const [date, setDate] = useState(new Date());

	const { state: userID } = useLocation();

	const back = () => {
		history("/ishhaqi");
	};

	// console.log("s", state);
	React.useEffect(() => {
		if (userID) {
			getdata();
		}
		getpercentData();
	}, []);

	const getdata = () => {
		axios.get(`http://localhost:8080/api/salarys/${userID}`).then((resp) => {
			setType(resp.data.type);
			setPercent(resp.data.percent);
			setDate(resp.data.date);
			// console.log(resp);
		});
	};

	const getpercentData = () => {
		axios.get(`http://localhost:8080/api/staffs`).then((resp) => {
			setPercentData(resp.data);
		});
	};

	const sendDataToAPI = () => {
		const data = {
			type,
			percent,
			teacherId: "62dc204dcf9a49242d18d00d",
			sana: date,
		};

		if (userID) {
			axios
				.put(`http://localhost:8080/api/salarys/${userID}`, data)
				.then(() => {
					history("/ishhaqi");
					setType("");
					setPercent("");
					setDate("");
				});
		} else {
			console.log(data);
			axios.post("http://localhost:8080/api/salarys", data).then(() => {
				history("/ishhaqi");
				setType("");
				setPercent("");
				setDate("");
			});
		}
	};

	// const data = {
	//   ...formData,
	//   step: {
	//     id: formData.step,
	//     title: Bosqich.find((item) => item.id === formData.step)?.title,
	//   },
	// };

	return (
		<Card sx={{ paddingBottom: 50 }}>
			<Container maxWidth="md">
				<Typography sx={{ marginY: 5 }} variant="h4">
					{userID ? "Edit " : "Add"}
				</Typography>
				<Grid container columns={12} spacing={5}>
					<Grid
						item
						xs={12}
						md={12}
						lg={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						<TextField
							id="input-with-icon-textfield"
							type="text"
							label="Turi"
							sx={{ width: "100%" }}
							onChange={(e) => setType(e.target.value)}
							value={type}
						/>
					</Grid>

					<Grid item xs={12} md={6} sm={6} lg={6} sx={{ mt: "22px" }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Fioz</InputLabel>
							<Select
								label="Fioz"
								sx={{ width: "100%" }}
								value={percent}
								onChange={(e) => setPercent(e.target.value)}
							>
								{percentData.map((item, i) => (
									<MenuItem value={item?.percent} name={item.percent} key={i}>
										{item.lastname} {item.firstname}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					{/* <Grid
            item
            xs={12}
            md={12}
            lg={6}
            sx={{ marginTop: { md: 3, xs: 3 } }}
          >
            <TextField
              id="input-with-icon-textfield"
              label="Foiz"
              sx={{ width: "100%" }}
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
            />
          </Grid> */}

					<Grid
						item
						xs={12}
						md={12}
						lg={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						<TextField
							type="date"
							id="input-with-icon-textfield"
							label="Tugilgan kun"
							sx={{ width: "100%" }}
							value={date}
							onChange={(e) => setDate(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start"></InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
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
							// marginTop: { md: 3, xs: 3 },
							// width: "100%",
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
				</Box>{" "}
			</Container>
		</Card>
	);
};
export default Add;
