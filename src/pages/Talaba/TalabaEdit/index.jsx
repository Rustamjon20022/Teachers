import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
	Card,
	Container,
	Typography,
	Grid,
	Button,
	TextField,
	Box,
	Switch,
	Select,
	MenuItem,
	Alert,
	Collapse,
	IconButton,
} from "@mui/material";

import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { useEffect } from "react";
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props) {
	const { onChange, value, ...other } = props;

	return (
		<NumberFormat
			style={{
				padding: "15px",
				fontSize: "16px",
				width: "100%",
				border: "none",
				height: "25px",
			}}
			format="+998 (##) ###-##-##"
			allowEmptyFormatting
			mask="_"
			onChange={onChange}
			value={value}
		/>
	);
});

NumberFormatCustom.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default () => {
	const navigate = useNavigate();
	const { state: bittaID } = useLocation();
	const [open, setOpen] = useState(true);
	const [isError, setIsError] = useState("");
	const [confirmpassword, setConfirmpassword] = useState("");
	const [bosqich, setBosqich] = useState([]);
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		phone: "",
		address: "",
		birthDate: "",
		image: "",
		status: true,
		groups: [],
	});

	useEffect(() => {
		if (bittaID) {
			getdata();
		}
		getBosqichData();
	}, []);

	const getBosqichData = () => {
		axios.get(`http://localhost:8080/api/groups`).then((resp) => {
			setBosqich(resp.data);
			// console.log(resp.data);
		});
	};
	const getdata = () => {
		axios.get(`http://localhost:8080/api/students/${bittaID}`).then((resp) => {
			// console.log("salom = ", resp.data.phone);
			setFormData({
				...formData,
				firstname: resp.data.firstname,
				lastname: resp.data.lastname,
				username: resp.data.username,
				password: resp.data.password,
				phone: resp.data.phone,
				address: resp.data.address,
				birthDate: resp.data.birthDate,
				groups: resp.data.groups[0].id,
				status: resp.data.status,
			});
		});
	};
	const handlePhone = (event) => {
		// console.log("vale sksjdfkj", event.target.value);
		setFormData({ ...formData, phone: event.target.value });
	};
	const Submit = (e) => {
		setConfirmpassword(e.target.value);
		if (formData.password != confirmpassword) {
			setIsError("Parol xato!");
		} else {
			const data = {
				...formData,
				image: "dfsdf",
				groups: [
					{
						id: formData.groups,
						title: bosqich.find((item) => item.id === formData.groups)?.title,
					},
				],
			};

			if (bittaID) {
				axios
					.put(`http://localhost:8080/api/students/${bittaID}`, data)
					.then(() => {
						navigate("/talaba", { replace: true });
					})
					.catch((err) => console.log(err));
			} else {
				axios.post("http://localhost:8080/api/students", data).then(() => {
					navigate("/talaba");
				});
			}
		}
	};

	return (
		<Card sx={{ paddingBottom: 50 }}>
			<Container maxWidth="md">
				<Typography sx={{ marginY: 5 }} variant="h4">
					{bittaID ? "Tahrirlash" : "Qo'shish"}
				</Typography>
				{isError ? (
					<Box sx={{ width: "100%" }}>
						<Collapse in={open}>
							<Alert severity="error" sx={{ mb: 2 }}>
								{isError}
							</Alert>
						</Collapse>
					</Box>
				) : (
					""
				)}

				<Grid container columns={12}>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sm={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						<TextField
							name="dsfdsf"
							id="input-with-icon-textfield1"
							label="Ismi"
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
						<TextField
							id="input-with-icon-textfield2"
							label="Familya"
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
						<TextField
							id="input-with-icon-textfield3"
							label="Foydalanuvchi nomi"
							sx={{ width: "90%" }}
							value={formData.username}
							onChange={(e) =>
								setFormData({
									...formData,
									username: e.target.value,
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
						<TextField
							id="input-with-icon-textfield31"
							label="Parol"
							sx={{ width: "90%" }}
							value={formData.password}
							onChange={(e) =>
								setFormData({
									...formData,
									password: e.target.value,
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
						<TextField
							id="input-with-icon-textfield7"
							sx={{ width: "90%" }}
							label="Takroriy parol"
							value={confirmpassword}
							onChange={(e) => setConfirmpassword(e.target.value)}
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
						<TextField
							sx={{ width: "90%", height: "100%" }}
							// label="Tel nomer"
							value={formData.phone}
							onChange={(e) => handlePhone(e)}
							name="numberformat"
							id="formatted-numberformat-input"
							InputProps={{
								inputComponent: NumberFormatCustom,
							}}
							variant="outlined"
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
						<TextField
							id="input-with-icon-textfield5"
							label="Manzil"
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
						<TextField
							type="date"
							id="input-with-icon-textfield7"
							sx={{ width: "90%" }}
							format="yyyy-MM-dd"
							value={formData.birthDate}
							onChange={(e) =>
								setFormData({
									...formData,
									birthDate: e.target.value,
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
						<Switch
							checked={formData.status}
							value={formData.status}
							onChange={(e) => {
								setFormData({
									...formData,
									status: !formData.status,
								});
							}}
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
						<Select
							label="Guruh"
							sx={{ border: 1, width: "90%" }}
							value={formData.groups}
							defaultValue={formData.groups}
							onChange={(e) => {
								setFormData({
									...formData,
									groups: e.target.value,
								});
							}}
						>
							{bosqich.map((item, i) => (
								<MenuItem
									value={item?.id}
									name={item.title}
									key={i}
									sx={{ border: 1 }}
								>
									{item.title}
								</MenuItem>
							))}
						</Select>
					</Grid>
				</Grid>
				<Box
					sx={{
						mt: 2,
						width: "100%",
						display: "flex",
						justifyContent: "end",
						gap: 2,
					}}
				>
					<Button
						onClick={() => navigate("/talaba")}
						id="statusOffGR"
						sx={{
							backgroundColor: "green",
							px: "2%s",
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
						onClick={Submit}
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
						{bittaID ? "Yanglash" : "Qo'shish"}
					</Button>
				</Box>
			</Container>
		</Card>
	);
};

// import React, { useEffect } from "react";
// import { useFormik } from "formik";
// import { Button, Card, Grid, InputBase, Switch } from "@mui/material";

// export default () => {
//   const formik = useFormik({
//     initialValues: {
//       firstname: "",
//       lastname: "",
//       username: "",
//       phone: "",
//       address: "",
//       birthDate: "",
//       password: "",
//       status: true,
//     },
//     onSubmit: (values) => {
//       const data = {
//         ...values,
//         birthDate: new Date(),
//         image: "dfsdf",
//         groups: ["adsaf"],
//       };

//       if (bittaID) {
//         axios
//           .put(`http://localhost:8080/api/students/${bittaID}`, data)
//           .then(() => {
//             navigate("/talaba", { replace: true });
//           })
//           .catch((err) => console.log(err));
//       } else {
//         axios.post("http://localhost:8080/api/students", data).then(() => {
//           navigate("/talaba");
//         });
//       }
//     },
//   });
//   useEffect(() => {
//     if (bittaID) {
//       getdata();
//     }
//   }, []);
//   const getdata = () => {
//     axios.get(`http://localhost:8080/api/students/${bittaID}`).then((resp) => {
//       console.log("====================================");
//       console.log(resp.data);
//       console.log("====================================");
//       formik.setValues({
//         ...formik.values,
//         firstname: resp.data.firstname,
//         lastname: resp.data.lastname,
//         username: resp.data.username,
//         password: resp.data.password,
//         phone: resp.data.phone,
//         address: resp.data.address,
//         status: resp.data.status,
//         birthDate: resp.data.birthDate,
//       });
//       formik(resp.data);
//     });
//   };
//   const navigate = useNavigate();
//   const { state: bittaID } = useLocation();

//   const data = [
//     {
//       id: "firstname",
//       placeholder: "Ismi",
//       name: "firstname",
//       type: "text",
//       value: formik.values.firstname,
//     },
//     {
//       id: "lastname",
//       placeholder: "Familyasi",
//       name: "lastname",
//       type: "text",
//       value: formik.values.lastname,
//     },
//     {
//       id: "username",
//       placeholder: "Foydalanuvchi nomi",
//       name: "username",
//       type: "text",
//       value: formik.values.username,
//     },
//     {
//       id: "Phone",
//       placeholder: "Tel.raqam",
//       name: "phone",
//       type: "text",
//       value: formik.values.phone,
//     },
//     {
//       id: "Address",
//       placeholder: "Manzil",
//       name: "address",
//       type: "text",
//       value: formik.values.address,
//     },
//     {
//       id: "password",
//       placeholder: "Manzil",
//       name: "password",
//       type: "text",
//       value: formik.values.password,
//     },
//     {
//       id: "Status",
//       name: "status",
//       type: "switch",
//       value: formik.values.status,
//     },
//   ];

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Card sx={{ p: "5%" }}>
//         <Grid container>
//           {data.map((item, idx) => {
//             switch (item.type) {
//               case "text":
//                 return (
//                   <Grid
//                     key={idx}
//                     itme
//                     xs={12}
//                     sm={6}
//                     md={6}
//                     lg={6}
//                     xl={6}
//                     sx={{ mt: 2 }}
//                   >
//                     <InputBase
//                       placeholder={item.placeholder}
//                       id={item.id}
//                       name={item.name}
//                       type={item.type}
//                       onChange={formik.handleChange}
//                       value={item.value}
//                       sx={{
//                         border: 1,
//                         width: "90%",
//                       }}
//                     />
//                   </Grid>
//                 );
//               case "select":
//                 return (
//                   <Switch
//                     name="sell"
//                     value={formik.status}
//                     checked={formik.status === true}
//                   />
//                 );
//             }
//           })}
//         </Grid>
//       </Card>
//       <Button type="submit">Submit</Button>
//     </form>
//   );
// };
