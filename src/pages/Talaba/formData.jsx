import React, { useState } from "react";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Card, Container, Typography, Grid, Button } from "@mui/material/node";
import { Box } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

const Edit = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const bittaID = location.state;
	// console.log(" bitta id " , location);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [birthDate, setBirthDate] = useState("");

	React.useEffect(() => {
		axios
			.get(`http://localhost:8080/api/intake/${bittaID}`)
			.then((response) => {
				// console.log("bitta data ", response.data.firstname);

				setFirstName(response.data.firstname);
				setLastName(response.data.lastname);
				setPhone(response.data.phone);
				setAddress(response.data.address);
				setBirthDate(response.data.birthDate);
			})
			.catch((err) => console.log(err));

		if (bittaID) {
			getdata();
		}
	}, []);

	const getdata = () => {
		axios.get(`http://localhost:8080/api/intake/${bittaID}`).then((resp) => {
			setFirstName(resp.data.firstname);
			setLastName(resp.data.lastname);
			setPhone(resp.data.phone);
			setAddress(resp.data.address);
			setBirthDate(resp.data.birthDate);
		});
	};

	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		subject: "",
		phone: "",
		address: "",
		birthDate: "",
		image: "",
		status: false,
	});

	const sendDataToAPI = () => {
		const data = formData;
		console.log("hh", formData);

		axios.post("http://localhost:8080/api/intake", data).then(() => {
			navigate("/qabul");
		});
	};

	// const sendDataToAPI = () => {
	// 	const data = {
	// 		firstname: firstName,
	// 		lastname: lastName,
	// 		username: "lkmjnhbgfddd",
	// 		password: "123",
	// 		subject: "mkjhg",
	// 		phone: phone,
	// 		address: address,
	// 		birthDate: birthDate,
	// 		image: "1.jpg",
	// 		status: true,
	// 	};
	// 	axios.post("http://localhost:8080/api/intake", data).then(() => {
	// 		navigate("/qabul");
	// 		setFirstName("");
	// 		setLastName("");
	// 		setPhone("");
	// 		setAddress("");
	// 		setBirthDate("");
	// 	});
	// };

	const Submit = () => {
		const data = {
			firstname: firstName,
			lastname: lastName,
			username: "frfrfrf",
			password: "frrfrfr",
			subject: "frfrfr",
			phone: phone,
			address: address,
			birthDate: birthDate,
			image: "frfrfrf",
			status: true,
		};
		axios
			.put(`http://localhost:8080/api/intake/${bittaID}`, data)
			.then(() => {
				alert("Product successfully Updated!!!");
				navigate("/qabul", { replace: true });
				setFirstName("");
				setLastName("");
				setPhone("");
				setAddress("");
				setBirthDate("");
			})
			.catch((err) => console.log(err));
	};

	return (
		// <div>
		// 	<TextField
		// 					id="input-with-icon-textfield"
		// 					label="FirstName"
		// 					sx={{ width: "90%" }}
		// 					defaultValue={FirstName}
		// 					onChange={(e) => setFirstName(e.target.value)}
		// 					value={FirstName}
		// 				/>
		// </div>

		<Card sx={{ paddingBottom: 50 }}>
			<Container maxWidth="md">
				<Typography sx={{ marginY: 5 }} variant="h4">
					{bittaID ? "edit" : "add"}
				</Typography>
				<Grid container columns={12}>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sm={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						{/* <TextField
							id="input-with-icon-textfield"
							label="FirstName"
							sx={{ width: "90%" }}
							defaultValue={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						/> */}

						<TextField
							label="FirstName"
							sx={{ width: "90%" }}
							value={formData.firstname}
							onChange={(e) =>
								setFormData({
									...formData,
									firstname: e.target.value,
								})
							}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sm={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						{/* <TextField
							id="input-with-icon-textfield"
							label="LastName"
							sx={{ width: "90%" }}
							value={lastName}
							defaultValue={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/> */}

						<TextField
							label="Lastname"
							sx={{ width: "90%" }}
							value={formData.lastname}
							onChange={(e) =>
								setFormData({
									...formData,
									lastname: e.target.value,
								})
							}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sm={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						{/* <TextField
							id="input-with-icon-textfield"
							label="Phone"
							sx={{ width: "90%" }}
							onChange={(e) => setPhone(e.target.value)}
							value={phone}
							defaultValue={phone}
							type="number"
						/> */}

						<TextField
							label="Phone"
							sx={{ width: "90%" }}
							value={formData.phone}
							onChange={(e) =>
								setFormData({
									...formData,
									phone: e.target.value,
								})
							}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sm={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						{/* <TextField
							id="input-with-icon-textfield"
							label="Address"
							sx={{ width: "90%" }}
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/> */}

						<TextField
							label="Address"
							sx={{ width: "90%" }}
							value={formData.address}
							onChange={(e) =>
								setFormData({
									...formData,
									address: e.target.value,
								})
							}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sm={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						{/* <TextField
							type="date"
							id="input-with-icon-textfield"
							label="BirthDate"
							sx={{ width: "90%" }}
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							}}
						/> */}

						<TextField
							type="date"
							id="input-with-icon-textfield"
							label="BirthDate"
							sx={{ width: "90%" }}
							value={formData.birthDate}
							onChange={(e) =>
								setFormData({
									...formData,
									birthDate: e.target.value,
								})
							}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										{/* <AccountCircle /> */}
									</InputAdornment>
								),
							}}
							// variant="standard"
						/>
					</Grid>
				</Grid>
				<Box
					sx={{
						mt: 2,
						ml: -4.4,
						width: "100%",
						display: "flex",
						justifyContent: "end",
						gap: 2,
					}}
				>
					<Button
						onClick={() => navigate("/qabul")}
						id="statusOffGR"
						sx={{
							backgroundColor: "green",
							px: "2%",
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
						onClick={bittaID ? Submit : sendDataToAPI}
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
						{bittaID ? "Edit" : "Add"}
					</Button>
				</Box>
			</Container>
		</Card>
	);
};
export default Edit;
