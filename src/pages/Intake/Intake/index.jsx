import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Chip, Modal } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Navbar from "../../../components/Navbar";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import DeletModal from "../../../components/DeletModal";

const Intake = () => {
	const [data, setData] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		getdata();
	}, []);

	const getdata = () => {
		axios.get("http://localhost:8080/api/intake").then((resp) => {
			setData(resp.data);
		});
	};

	const handleNavigate = (id) => {
		// console.log("row", id);
		navigate("/qabul/Edit", { state: id });
	};

	const navigateAdd = () => {
		navigate("/qabul/Edit");
	};

	function Row({ row, index }) {
		const [open, setOpen] = React.useState(false);

		return (
			<>
				<React.Fragment>
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
							style={{ fontWeight: "bold", fontSize: "15px" }}
						>
							{row.firstname} {row.lastname}
						</TableCell>
						<TableCell align="left" style={{ color: "#67748E" }}>
							{row.status === true ? (
								<Chip size="small" id="statusGR" label="Aktiv" />
							) : (
								<Chip size="small" id="statusOffGR" label="NoAktiv" />
							)}
						</TableCell>

						<TableCell align="left" sx={{ fontSize: "15px" }}>
							{row.phone}
						</TableCell>

						{/* <TableCell align="left" sx={{ fontSize: "15px" }}>
							{row.birthDate}
						</TableCell> */}
						{/* 
						<TableCell align="left" sx={{ fontSize: "15px" }}>
							{row.address}
						</TableCell> */}

						<TableCell align="left" style={{ color: "#67748E" }}>
							<DeletModal
								tahirlash={() => handleNavigate(row.id)}
								uchirish={() => handleDelete(row.id)}
							/>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
							<Collapse in={open} timeout="auto" unmountOnExit>
								<Box sx={{ ml: 5 }}>
									<Table aria-label="purchases">
										<TableHead>
											<TableRow key={row.id}>
												<TableCell sx={{ fontWeight: "bold" }}>Ismi</TableCell>
												<TableCell sx={{ fontWeight: "bold" }}>
													Familya
												</TableCell>
												<TableCell sx={{ fontWeight: "bold" }}>
													Manzil
												</TableCell>
												<TableCell sx={{ fontWeight: "bold" }}>
													Tug'ilgan kun
												</TableCell>
												<TableCell sx={{ fontWeight: "bold" }}>
													Tel Nomer
												</TableCell>
												<TableCell sx={{ fontWeight: "bold" }}>
													Description
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell>{row.firstname}</TableCell>
												<TableCell>{row.lastname}</TableCell>
												<TableCell>{row.address}</TableCell>
												<TableCell>{row.birthDate}</TableCell>
												<TableCell>{row.phone}</TableCell>
												<TableCell>Description</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</Box>
							</Collapse>
						</TableCell>
					</TableRow>
				</React.Fragment>
			</>
		);
	}
	const handleDelete = (id) => {
		axios.delete(`http://localhost:8080/api/intake/${id}`).then(() => {
			getdata();
		});
	};
	return (
		<>
			<Navbar title="Qabul" />
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
					QO`SHISH
				</Button>
			</Box>
			<Card>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							{[
								"",
								"#",
								"AUTHOR",
								"STATUS",
								"TEL NOMER",
								// "TUG`ILGAN KUN",
								// "MANZIL",
								"BOSHQARUV",
							].map((item) => (
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
