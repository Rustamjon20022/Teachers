import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";

import {
	Button,
	Container,
	Grid,
	Switch,
	TextField,
	Typography,
	Card,
	Box,
	MenuItem,
	Select,
	OutlinedInput,
	IconButton,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router";

import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

//service import
import service from "../../../services/staff";
import gr from "../../../services/attendance";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

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

const Edit = () => {
	let history = useNavigate();

	const back = () => {
		history("/xodim");
	};

	const { state } = useLocation();
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");

	const [Phone, setPhone] = useState("");
	const [Address, setAddress] = useState("");
	const [Username, setUsername] = useState("");
	const [Password, setPassword] = useState("");
	const [Password2, setPassword2] = useState("");
	const [Status, setStatus] = useState(false);
	const [BirthDate, setBirthDate] = useState("");
	const [Role, setRole] = useState("");
	const [Group, setGroup] = useState([]);

	const [Error, setError] = useState(false);

	const [values, setValues] = React.useState({
		amount: "",
		password: "",
		weight: "",
		weightRange: "",
		showPassword: false,
		showPassword2: false,
	});

	const [Pvalues, setPValues] = React.useState({
		textmask: "+998 (##) ###-##-##",
		numberformat: "",
	});

	// const handleChangeP = (event) => {
	// 	console.log("vale sksjdfkj", event);

	const handlePhone = (event) => {
		console.log("vale sksjdfkj", event.target.value);
		setPhone(event.target.value);
	};

	// 	setPhone(event.target.value);
	// 	setValues({
	// 		...values,
	// 		[event.target.name]: event.target.value,
	// 	});
	// };

	const [Gr, setGr] = useState([]);

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClickShowPassword2 = () => {
		setValues({
			...values,
			showPassword2: !values.showPassword2,
		});
	};

	const handleMouseDownPassword2 = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setGroup(typeof value === "string" ? value.split(",") : value);
	};

	React.useEffect(() => {
		gr.getGroups().then((resp) => {
			setGr(resp);
			console.log(resp);
		});
		if (state) {
			getdata();
		}
	}, []);

	const getdata = () => {
		service.getOneById(state).then((resp) => {
			setFirstName(resp.firstname);
			setLastName(resp.lastname);
			setPhone(resp.phone);
			setAddress(resp.address);
			setUsername(resp.username);
			setPassword(resp.password);
			setPassword2(resp.password);
			setStatus(resp.status);
			setBirthDate(resp.birthDate);
			setGroup(resp.groups);
			setRole(resp.role);
		});
	};

	const Submit = () => {
		const data = {
			firstname: FirstName,
			lastname: LastName,
			username: Username,
			password: Password,
			phone: Phone,
			address: Address,
			groups: Group,
			subject: ["Subject"],
			birthDate: BirthDate,
			image: "1.jpasdg",
			status: Status,
			role: Role,
		};
		if (Password == Password2) {
			service.editStaff(state, data).then(() => {
				history("/xodim", { replace: true });
				setFirstName("");
				setLastName("");
				setPhone("");
				setAddress("");
				setUsername("");
				setPassword("");
				setBirthDate("");
				setStatus(false);
				setRole("");
				setGroup([]);
			});
		} else {
			alert("Parol notog`ri kiritilgan");
		}
	};

	const sendDataToAPI = () => {
		const data = {
			firstname: FirstName,
			lastname: LastName,
			username: Username,
			password: Password,
			phone: Phone,
			address: Address,
			groups: Group,
			subject: ["dsfghj"],
			birthDate: BirthDate,
			image: "1.jpasdg",
			status: Status,
			role: Role,
		};

		if (Password == Password2) {
			service.addStaff(data).then(() => {
				history("/xodim");
				setUsername("");
				setFirstName("");
				setLastName("");
				setPhone("");
				setAddress("");
				setPassword("");
				setStatus(false);
				setBirthDate("");
				setGroup([]);
				setRole("");
			});
		} else {
			alert("Parol notog`ri kiritilgan");
		}
	};

	return (
		<Card sx={{ paddingBottom: 5 }}>
			<Container maxWidth="md">
				<Typography sx={{ marginY: 5 }} variant="h4">
					{state ? "Xodim Tahrirlash" : " Xodim Qo`shish"}
				</Typography>
				<Grid container spacing={3}>
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
							placeholder="Ism"
							sx={{ width: "100%" }}
							onChange={(e) => setFirstName(e.target.value)}
							value={FirstName}
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
							placeholder="Familiya"
							sx={{ width: "100%" }}
							onChange={(e) => setLastName(e.target.value)}
							value={LastName}
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
							placeholder="Foydalanuvchi nomi"
							sx={{ width: "100%" }}
							onChange={(e) => setUsername(e.target.value)}
							value={Username}
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
							sx={{ width: "100%", height: "100%" }}
							// label="Tel nomer"
							value={Phone}
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
						md={12}
						lg={6}
						xl={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						<TextField
							type="text"
							placeholder="Manzil"
							sx={{ width: "100%" }}
							onChange={(e) => setAddress(e.target.value)}
							value={Address}
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
						<Select
							labelId="demo-multiple-name-label"
							id="demo-multiple-name"
							multiple
							label="Guruh"
							sx={{ width: "100%" }}
							value={Group}
							onChange={handleChange}
							input={<OutlinedInput label="Guruh" />}
							MenuProps={MenuProps}
						>
							{Gr.map((option, ind) => (
								<MenuItem key={ind} value={option.title}>
									{option.title}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid
						item
						xs={12}
						md={12}
						lg={6}
						xl={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							sx={{ width: "100%" }}
							value={Role}
							placeholder="Lavozim"
							onChange={(e) => setRole(e.target.value)}
						>
							<MenuItem value="Teacher">Teacher</MenuItem>
							<MenuItem value="Reception">Reception</MenuItem>
							<MenuItem value="Manager">Manager</MenuItem>
							<MenuItem value="Tex">Tex</MenuItem>
						</Select>
					</Grid>

					<Grid
						item
						xs={12}
						md={12}
						lg={6}
						xl={6}
						sx={{ marginTop: { md: 3, xs: 3 } }}
					>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword ? "text" : "password"}
							value={Password}
							sx={{ width: "100%" }}
							onChange={(e) => setPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							placeholder="Parol"
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
							type="date"
							placeholder="Tug`ulgan sana"
							sx={{ width: "100%" }}
							onChange={(e) => setBirthDate(e.target.value)}
							value={BirthDate}
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
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword2 ? "text" : "password"}
							value={Password2}
							sx={{ width: "100%" }}
							onChange={(e) => setPassword2(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword2}
										onMouseDown={handleMouseDownPassword2}
										edge="end"
									>
										{values.showPassword2 ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							placeholder="Parol (qayta)"
						/>
					</Grid>

					<Grid
						item
						xs={12}
						md={12}
						lg={6}
						xl={6}
						sx={{
							marginTop: { md: 3, xs: 3 },
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Typography>Status</Typography>
						<Switch
							label="Status"
							onChange={(e) => setStatus(!Status)}
							checked={Status}
							value={Status}
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
						onClick={state ? Submit : sendDataToAPI}
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
				</Box>
			</Container>
		</Card>
	);
};
export default Edit;
