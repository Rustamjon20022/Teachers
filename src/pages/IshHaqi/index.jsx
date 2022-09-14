import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography, Card, Modal, Stack } from "@mui/material";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { Add, Delete, Edit } from "@mui/icons-material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 300,
	height: 250,
	bgcolor: "background.paper",
	borderRadius: 2,
	p: 4,
};

const Intake = () => {
	////Modal////
	const [openModal, setOpenModal] = React.useState(false);
	const handleOpenModal = (id) => {
		window.localStorage.setItem("ItemId", id);
		setOpenModal(true);
	};
	const handleCloseModal = () => setOpenModal(false);

	const [data, setData] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		getdata();
	}, []);

	const getdata = () => {
		axios.get("http://localhost:8080/api/salarys").then((resp) => {
			setData(resp.data);
			//   console.log("d", resp.data);
		});
	};

	const handleNavigate = (id) => {
		// console.log("row", id);
		navigate("add", { state: id });
	};

	const navigateAdd = () => {
		navigate("add");
	};
	// console.log(data);
	//   function Row({ row, index }) {
	//     const [open, setOpen] = React.useState(false);

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
				<React.Fragment>
					<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
						<Modal
							open={openModal}
							onClose={handleCloseModal}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={{ ...style }}>
								<Box sx={{ justifyContent: "center", textAlign: "center" }}>
									<BsFillExclamationTriangleFill
										style={{ fontSize: "100px", color: "red" }}
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
											onClick={handleCloseModal}
											sx={{
												bgcolor: "#0030",
												fontWeight: "bold",
												color: "black",
												":hover": { bgcolor: "red", color: "#fff" },
											}}
										>
											Bekor qlish
										</Button>
										<Button
											onClick={() => handleDelete(row.id)}
											sx={{
												bgcolor: "#fff",
												fontWeight: "bold",
												color: "black",
												":hover": { bgcolor: "#cb0c9f", color: "#fff" },
											}}
										>
											Tasdiqlash
										</Button>
									</Stack>
								</Box>
							</Box>
						</Modal>

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
							style={{ fontWeight: "bold", fontSize: "15px" }}
						>
							{row.type}
						</TableCell>
						<TableCell align="left" sx={{ fontSize: "15px" }}>
							{row.percent}
						</TableCell>
						<TableCell align="left" style={{ color: "#67748E" }}>
							<Typography>{row.sana}</Typography>
						</TableCell>

						<TableCell align="left" style={{ color: "#67748E" }}>
							<Box sx={{ display: "flex", gap: "3%" }}>
								<Button
									onClick={() => handleOpenModal(row.id)}
									sx={{
										color: "#F0445F",
										display: "flex",
										alignItems: "center",
										fontWeight: "bold",
										fontSize: "10px",
									}}
								>
									<Delete fontSize="small" />
									<Typography
										fontSize="12px"
										fontWeight="bold"
										sx={{
											display: {
												xs: "none",
												sm: "none",
												md: "flex",
												lg: "flex",
											},
										}}
									>
										O`CHIRISH
									</Typography>
								</Button>

								<Button
									onClick={() => handleNavigate(row.id)}
									sx={{
										color: "#344767",
										display: "flex",
										alignItems: "center",
									}}
								>
									<Edit fontSize="small" />
									<Typography
										fontSize="12px"
										fontWeight="bold"
										sx={{
											display: {
												xs: "none",
												sm: "none",
												md: "flex",
												lg: "flex",
											},
										}}
									>
										Tahrirlash
									</Typography>
								</Button>
							</Box>
						</TableCell>
					</TableRow>
				</React.Fragment>
			</>
		);
	}
	const handleDelete = (id) => {
		axios.delete(`http://localhost:8080/api/salarys/${id}`).then(() => {
			getdata();
			handleCloseModal();
		});
	};

	return (
		<>
			<Navbar title="Ish haqqi" />
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
					Qo'shish
				</Button>
			</Box>
			<Card>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							{["#", "Turi ", "Foiz", "Sana", "Boshqarish"].map((item) => (
								<TableCell
									key={item}
									align="left"
									sx={{ fontWeight: "bold", color: "gray" }}
								>
									{item}{" "}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{data.map((row, index) => (
							<Row key={row.id} row={row} index={index} />
						))}
					</TableBody>
				</Table>
			</Card>
		</>
	);
};

export default Intake;
