import { Add, Delete, Edit } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Card, Chip, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material/node";
import Modal from "@mui/material/node/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
const textstyle = {
	fontWeight: "600",
	color: "gray",
};
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};
const Guruh = () => {
	const [data, setData] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		getdata();
	}, []);

	const getdata = () => {
		axios.get("http://localhost:8080/api/students").then((resp) => {
			setData(resp.data);
			console.log("dsadas", resp.data);
		});
	};

	const handleNavigate = (row, id) => {
		console.log("asdasdasdasdasdasdasdwqeasd", row);
		navigate("/edittalaba", { state: id });
	};

	const navigateAdd = () => {
		navigate("/edittalaba");
	};

	function Row({ row, index }) {
		const [open, setOpen] = React.useState(false);
		const [open1, setOpen1] = React.useState(false);
		const handleOpen = () => {
			setOpen1(true);
		};
		const handleClose = () => {
			setOpen1(false);
		};
		return (
			<>
				<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
					<TableCell>
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => setOpen(!open)}
						>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
					<TableCell
						align="left"
						component="th"
						scope="row"
						style={{ fontSize: "15px" }}
					>
						{index + 1}
					</TableCell>
					<TableCell
						align="left"
						component="th"
						scope="row"
						style={{ fontSize: "15px" }}
					>
						{row.firstname}
					</TableCell>
					<TableCell
						align="left"
						component="th"
						scope="row"
						style={{ fontSize: "15px" }}
					>
						{row.lastname}
					</TableCell>
					<TableCell align="left" sx={{ fontSize: "15px" }}>
						{row.phone}
					</TableCell>
					<TableCell align="left" style={{ color: "#67748E" }}>
						{row.status === true ? (
							<Chip size="small" id="statusGR" label="Active" />
						) : (
							<Chip size="small" id="statusOffGR" label="noActive" />
						)}
					</TableCell>
					<TableCell align="left" sx={{ fontSize: "15px" }}>
						{row.address}
					</TableCell>

					<TableCell align="left" style={{ color: "#67748E" }}>
						<Box sx={{ display: "flex", gap: "3%" }}>
							<Button
								onClick={handleOpen}
								sx={{
									color: "#F0445F",
									display: "flex",
									alignItems: "center",
									fontWeight: "bold",
									fontSize: "10px",
								}}
							>
								<Delete fontSize="small" />
								<Typography fontSize="12px" fontWeight="bold">
									o`chirish
								</Typography>
							</Button>
							<Button
								onClick={() => handleNavigate(row, row.id)}
								sx={{
									color: "#344767",
									display: "flex",
									alignItems: "center",
								}}
							>
								<Edit fontSize="small" />
								<Typography fontSize="12px" fontWeight="bold">
									tahrirlash
								</Typography>
							</Button>

							<Modal
								hideBackdrop
								open={open1}
								onClose={handleClose}
								aria-labelledby="child-modal-title"
								aria-describedby="child-modal-description"
							>
								<Box sx={{ ...style }}>
									<Box sx={{ justifyContent: "center", textAlign: "center" }}>
										<BsFillExclamationTriangleFill
											style={{ fontSize: "100px", color: "yellow" }}
										/>
									</Box>
									<Typography
										sx={{ mb: 3 }}
										id="modal-modal-title"
										variant="h5"
										component="h2"
										textAlign="center"
										fontWeight="bold"
									>
										Olib tashlashni <br />
										tasdiqlaysizmi?
									</Typography>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "end",
											gap: 2,
										}}
									>
										<Stack
											direction="row"
											spacing={2}
											sx={{
												display: "flex",
												justifyContent: "space-around",
												alignItems: "center",
												width: "100%",
											}}
										>
											<Button
												onClick={handleClose}
												sx={{
													fontWeight: "bold",
													bgcolor: "red",
													color: "white",
													width: "40%",
													height: "10%",
													":hover": {
														color: "red",
														border: 1,
														borderColor: "red",
													},
												}}
											>
												Bekor qlish
											</Button>
											<Button
												onClick={() => handleDelete(row.id)}
												sx={{
													border: 1,
													fontWeight: "bold",
													width: "40%",
													height: "10%",
												}}
											>
												Tasdiqlash
											</Button>
										</Stack>
									</Box>
								</Box>
							</Modal>
						</Box>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={25}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box>
								<Table
									size="small"
									sx={{ width: "100%", px: "3%" }}
									aria-label="purchases"
								>
									<TableHead key="thead0">
										<TableRow key={row.id}>
											{[
												"ISMI",
												"FAMILYASI",
												"FOY.NOMI",
												"PAROL",
												"MANZIL",
												"TEL.RAQAM",
												"Tug.sana",
												"Guruh",
											].map((title, i_d) => (
												<TableCell key={i_d}>{title}</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody key="body">
										<TableRow key={row.id}>
											<TableCell>{row.firstname}</TableCell>
											<TableCell>{row.lastname}</TableCell>
											<TableCell>{row.username}</TableCell>
											<TableCell>{row.password}</TableCell>
											<TableCell>{row.address}</TableCell>
											<TableCell>{row.phone}</TableCell>
											<TableCell>{row.birthDate}</TableCell>
											<TableCell>{row.groups[0].title}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</>
		);
	}
	const handleDelete = (id) => {
		axios.delete(`http://localhost:8080/api/students/${id}`).then(() => {
			getdata();
		});
	};

	return (
		<>
			<Navbar title="Talaba" />
			<Box sx={{ width: "100%" }}></Box>
			<Box sx={{ my: "1%" }}>
				<Button
					variant="contained"
					endIcon={<Add />}
					onClick={navigateAdd}
					sx={{
						backgroundImage: "linear-gradient(310deg,#141727,#3a416f)",
						fontWeight: "bold",
						color: "#fff",
						":hover": { bgcolor: "#CB0C9F", color: "#fff" },
					}}
				>
					QO'SHiSH
				</Button>
			</Box>
			<Card>
				<Table aria-label="collapsible table" className="tableGR">
					<TableHead key="thead">
						<TableRow>
							{[
								"",
								"#",
								"ISMI",
								"FAMILYASI",
								"TEL.RAQAM",
								"HOLATI",
								"MANZIL",
								"BOSHQARISH",
							].map((item, i) => (
								<TableCell align="left" sx={textstyle} key={`${i + 20}`}>
									{item}{" "}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody key="body">
						{data.map((row, index) => (
							<Row key={row.id} row={row} index={index} />
						))}
					</TableBody>
				</Table>
			</Card>
		</>
	);
};

export default Guruh;
