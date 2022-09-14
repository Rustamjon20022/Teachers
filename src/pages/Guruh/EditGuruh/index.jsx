import React, { useEffect, useState } from "react";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
	Card,
	Container,
	Typography,
	Grid,
	Button,
	Autocomplete,
	Box,
	Checkbox,
	Switch,
	FormControlLabel,
} from "@mui/material/node";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useNavigate, useLocation } from "react-router";
// import { hafta } from "./helper";

const Edit = () => {
	let history = useNavigate();
	const location = useLocation();
	const oneID = location.state;
	const [Bosqich, setBosqich] = useState([]);
	const [Xona, setXona] = useState([]);
	const [FanlarData, setFanlarData] = useState([]);
	const [hafta, setHafta] = useState([
		{ id: "1", title: "Dushanba", IsSelect: false },
		{ id: "2", title: "Seshanba", IsSelect: false },
		{ id: "3", title: "Chorshanba", IsSelect: false },
		{ id: "4", title: "Payshanba", IsSelect: false },
		{ id: "5", title: "Juma", IsSelect: false },
		{ id: "6", title: "Shanba", IsSelect: false },
		{ id: "7", title: "Yakshanba", IsSelect: false },
	]);
	const [formData, setFormData] = useState({
		title: "",
		step: {},
		desc: "",
		darsBoshlanishi: new Date(),
		dasrTugashi: new Date(),
		darsKunlari: [],
		status: true,
		xona: {},
		subject: {},
	});

	const [userinfo, setUserInfo] = useState({
		languages: [],
		response: [],
	});

	const handleChange = (e, id) => {
		const { value, checked } = e.target;
		const { languages } = userinfo;

		const updatedWeekData = hafta.map((week) => {
			if (week.id === id) {
				return {
					...week,
					IsSelect: !week.IsSelect,
				};
			} else return week;
		});

		setHafta(updatedWeekData);

		setFormData({
			...formData,
			darsKunlari: userinfo.response,
		});
		if (checked) {
			setUserInfo({
				languages: [...languages, value],
				response: [...languages, value],
			});
		} else {
			setUserInfo({
				languages: languages.filter((e) => e !== value),
				response: languages.filter((e) => e !== value),
			});
		}
	};
	const checkWeekDaysIsSelected = (daysData) => {
		const updatedWeekData = hafta.map((week) => {
			if (daysData.includes(week.id * 1)) {
				return {
					...week,
					IsSelect: true,
				};
			} else return week;
		});
		setHafta(updatedWeekData);
	};
	const getdata = () => {
		axios.get(`http://localhost:8080/api/groups/${oneID}`).then(({ data }) => {
			setFormData({
				...formData,
				title: data.title,
				step: data.step.id,
				desc: data.desc,
				darsKunlari: data.darsKunlari,
				darsBoshlanishi: data.darsBoshlanishi,
				dasrTugashi: data.dasrTugashi,
				subject: data.subject.id,
				xona: data.xona.id,
				status: data.status,
			});
			checkWeekDaysIsSelected(data.darsKunlari);
		});
	};

	const getBosqichData = () => {
		axios.get(`http://localhost:8080/api/steps`).then((resp) => {
			setBosqich(resp.data);
		});
	};
	const getXoonaIdData = () => {
		axios.get(`http://localhost:8080/api/rooms`).then((resp) => {
			setXona(resp.data);
		});
	};
	const getFanData = () => {
		axios.get("http://localhost:8080/api/subjects").then((resp) => {
			setFanlarData(resp.data);
		});
	};

	React.useEffect(() => {
		if (oneID) {
			getdata();
		}
		getBosqichData();
		getXoonaIdData();
		getFanData();
	}, []);

	const Submit = () => {
		let selectedDays = [];
		hafta.forEach((item) => {
			if (item.IsSelect) {
				selectedDays = [...selectedDays, item.id];
			}
		});

		const data = {
			...formData,
			step: {
				id: formData.step,
				title: Bosqich.find((item) => item.id === formData.step)?.title,
			},
			xona: {
				id: formData.xona,
				title: Xona.find((item) => item.id === formData.xona)?.title,
			},
			subject: {
				id: formData.subject,
				title: FanlarData.find((item) => item.id === formData.subject)?.title,
			},
			darsKunlari: selectedDays,
		};
		if (oneID) {
			axios.put(`http://localhost:8080/api/groups/${oneID}`, data).then(() => {
				history("/guruh", { replace: true });
			});
		} else {
			axios.post("http://localhost:8080/api/groups", data).then(() => {
				history("/guruh");
			});
		}
	};

	return (
		<Card sx={{ mt: "1%", pb: "5%" }}>
			<Container maxWidth="md">
				<Typography sx={{ marginY: 5 }} variant="h4">
					{oneID
						? "Guruh malumotlarini tahrirlash"
						: "Guruhga yangi malumotlar qo`shish"}
				</Typography>
				<Grid container columns={12} spacing={4}>
					<Grid item xs={12} sm={6} md={6} lg={6}>
						<TextField
							sx={{ width: "100%" }}
							variant="outlined"
							id="input-with-icon-textfield"
							label="Nomi"
							onChange={(e) =>
								setFormData({
									...formData,
									title: e.target.value,
								})
							}
							value={formData.title}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={6} lg={6}>
						<TextField
							sx={{ width: "100%" }}
							id="input-with-icon-textfield"
							label="Malumot "
							onChange={(e) =>
								setFormData({
									...formData,
									desc: e.target.value,
								})
							}
							value={formData.desc}
							variant="outlined"
						/>
					</Grid>

					<Grid item xs={12} md={6} sm={6} lg={6}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<Stack spacing={3}>
								<MobileTimePicker
									label="Dars boshlanishi"
									onChange={(newValue) =>
										setFormData({
											...formData,
											darsBoshlanishi: newValue,
										})
									}
									value={formData.darsBoshlanishi}
									// defaultValue={formData.darsBoshlanishi}
									renderInput={(params) => (
										<TextField variant="outlined" {...params} />
									)}
								/>
							</Stack>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} md={6} sm={6} lg={6}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<Stack spacing={3}>
								<MobileTimePicker
									label="Dars tugashi"
									value={formData.dasrTugashi}
									onChange={(newValue) => {
										setFormData({
											...formData,
											dasrTugashi: newValue,
										});
									}}
									renderInput={(params) => (
										<TextField variant="outlined" {...params} />
									)}
								/>
							</Stack>
						</LocalizationProvider>
					</Grid>

					<Grid item xs={12} md={6} sm={6} lg={6}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Bosqich</InputLabel>
							<Select
								label="Bosqich"
								value={formData.step}
								onChange={(e) => {
									setFormData({
										...formData,
										step: e.target.value,
									});
								}}
							>
								{Bosqich.map((item, i) => (
									<MenuItem value={item?.id} name={item.title} key={i}>
										{item.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={6} sm={6} lg={6}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Xona</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Xona"
								value={formData.xona}
								onChange={(e) =>
									setFormData({
										...formData,
										xona: e.target.value,
									})
								}
							>
								{Xona.map((item, i) => (
									<MenuItem value={item.id} name={item.title} key={i}>
										{item.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={6} sm={6} lg={6}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Fanlar</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Fanlar"
								value={formData.subject}
								onChange={(e) =>
									setFormData({
										...formData,
										subject: e.target.value,
									})
								}
							>
								{FanlarData.map((item, i) => (
									<MenuItem value={item.id} name={item.title} key={i}>
										{item.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={6}
						sm={6}
						sx={{ display: "flex", alignItems: "center" }}
					>
						<Typography>Holati</Typography>
						<Switch
							value={formData.status}
							checked={formData.status}
							onChange={(e) =>
								setFormData({
									...formData,
									// status: e.target.value,
									status: !formData.status,
								})
							}
						/>
					</Grid>
					<Grid item xs={12} md={12} lg={12}>
						<Typography>Dars kunlari</Typography>
						<Grid container>
							{hafta.map((item, index) => (
								<Grid item xs={6} md={6} lg={4} key={index}>
									<Box sx={{ display: "flex", alignItems: "center" }}>
										<FormControlLabel
											control={
												<Checkbox
													checked={item.IsSelect}
													value={item.id}
													onChange={(e) => handleChange(e, item.id)}
												/>
											}
											label={item.title}
										/>
									</Box>
								</Grid>
							))}
						</Grid>
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
						onClick={() => history("/guruh")}
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
						{oneID ? "Tahrirlash" : "Qo`shish"}
					</Button>
				</Box>
			</Container>
		</Card>
	);
};
export default Edit;
