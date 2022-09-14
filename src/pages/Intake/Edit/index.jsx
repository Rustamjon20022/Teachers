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
	InputAdornment,
} from "@mui/material";
import DatePicker from "react-datepicker";

import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

// const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
// 	const { onChange, ...other } = props;
// 	return (
// 		<IMaskInput
// 			{...other}
// 			format="+998 (##) ###-##-##"
// 			allowEmptyFormatting mask="_"
// 			definitions={{
// 				"#": /[1-9]/,
// 			}}
// 			inputRef={ref}
// 			onAccept={(value) => onChange({ target: { name: props.name, value } })}
// 			overwrite
// 		/>
// 	);
// });

// TextMaskCustom.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	onChange: PropTypes.func.isRequired,
// };

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
	const navigate = useNavigate();
	const { state: bittaID } = useLocation();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [birthDate, setBirthDate] = useState(new Date());
	const [status, setStatus] = useState(true);
	const [values, setValues] = React.useState({
		textmask: "+998 (##) ###-##-##",
		numberformat: "",
	});

	const handleChange = (event) => {
		// console.log('vale sksjdfkj', event);
		setPhone(event.target.value);
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	React.useEffect(() => {
		if (bittaID) {
			getdata();
		}
	}, []);

	const handlePhone = (event) => {
		// console.log('vale sksjdfkj', event.target.value);
		setPhone(event.target.value);
	};

	const getdata = () => {
		axios.get(`http://localhost:8080/api/intake/${bittaID}`).then((resp) => {
			setFirstName(resp.data.firstname);
			setLastName(resp.data.lastname);
			setPhone(resp.data.phone);
			setAddress(resp.data.address);
			setBirthDate(resp.data.birthDate);
			setStatus(resp.data.status);
		});
	};

	const Submit = () => {
		const data = {
			firstname: firstName,
			lastname: lastName,
			username: "frfrfrf",
			password: "frrfrfr",
			subject: "frfrfr",
			phone,
			address,
			birthDate,
			image: "frfrfrf",
			status,
		};
		if (bittaID) {
			axios
				.put(`http://localhost:8080/api/intake/${bittaID}`, data)
				.then(() => {
					navigate("/qabul", { replace: true });
				})
				.catch((err) => console.log(err));
		} else {
			axios.post("http://localhost:8080/api/intake", data).then(() => {
				navigate("/qabul");
			});
		}
	};

	return (
		<Card sx={{ paddingBottom: 50 }}>
			<Container maxWidth="md">
				<Typography sx={{ marginY: 5 }} variant="h4">
					{bittaID
						? "O`quvchilarni malumotlarini tahrirlash"
						: "Yangi o`quvchilarni qo`shish"}
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
						<TextField
							id="input-with-icon-textfield"
							label="Ismi"
							sx={{ width: "90%" }}
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
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
							id="input-with-icon-textfield"
							label="Familya"
							sx={{ width: "90%" }}
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
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
						<Box
							sx={{
								"& > :not(style)": {
									m: 0.1,
								},
							}}
						>
							<TextField
								sx={{ width: "90%", height: "100%" }}
								// label="Tel nomer"
								value={phone}
								onChange={(e) => handlePhone(e)}
								name="numberformat"
								id="formatted-numberformat-input"
								InputProps={{
									inputComponent: NumberFormatCustom,
								}}
								variant="outlined"
							/>
						</Box>
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
							id="input-with-icon-textfield"
							label="Manzil"
							sx={{ width: "90%" }}
							value={address}
							onChange={(e) => setAddress(e.target.value)}
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
						{/* <DatePicker
							dateFormat="yyyy/MM/dd"
							selected={birthDate}
							onChange={(date) => setBirthDate(date)}
							className="datePicker"
						/> */}
						<TextField
							type="date"
							id="input-with-icon-textfield"
							label="Tugilgan kun"
							sx={{ width: "90%" }}
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start"></InputAdornment>
								),
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
						<Switch
							defaultChecked
							value={status}
							checked={status}
							onChange={(e) => setStatus(!status)}
						/>
					</Grid>
				</Grid>
				<Box
					sx={{
						mt: 2,
						width: "95%",
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
							px: "1%",
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
							px: "4%",
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
export default Edit;
