import { Add, Delete, Edit } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Card, Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { Grid, Stack } from "@mui/material/node";
import DeletModal from "../../../components/DeletModal";

// import "../style.css";
const textstyle = {
	fontWeight: "600",
	color: "gray",
};

const Guruh = () => {
	const [data, setData] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		getdata();
	}, []);

	const getdata = () => {
		axios.get("http://localhost:8080/api/groups").then((resp) => {
			setData(resp.data);
			// console.log(resp.data);
		});
	};

	const handleNavigate = (id) => {
		// console.log("asdasdasdasdasdasdasdwqeasd", row);
		navigate("/guruh/Form", { state: id });
	};

	const navigateAdd = () => {
		// navigate("/addGuruh");
		navigate("/guruh/Form");
	};

	function Row({ row, index }) {
		let kun = row.darsKunlari;

		var hafta = {
			1: "Dsh/",
			2: "Ssh/",
			3: "Chr/",
			4: "Pay/",
			5: "Ju/",
			6: "Shn/",
			7: "Yak/",
		};
		var numbar = kun.map((val) => {
			return hafta[val];
		});

		var DatadasrTugashi = new Date(row.dasrTugashi);
		var dasrTugashi =
			DatadasrTugashi.getHours() + ":" + DatadasrTugashi.getMinutes();

		var DatadarsBoshlanishi = new Date(row.darsBoshlanishi);
		var darsBoshlanishi =
			DatadarsBoshlanishi.getHours() + ":" + DatadarsBoshlanishi.getMinutes();
		// console.log("-----------", time);

		const [open, setOpen] = React.useState(false);

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
						style={{ fontWeight: "bold", fontSize: "15px" }}
					>
						{row.title}
					</TableCell>
					<TableCell align="left" sx={{ fontSize: "15px" }}>
						{row.desc}
					</TableCell>

					<TableCell
						align="left"
						style={{
							color: "#67748E",
							display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
						}}
					>
						{row.status === true ? (
							<Chip size="small" id="statusGR" label="Aktiv" />
						) : (
							<Chip size="small" id="statusOffGR" label="NoAktiv" />
						)}
					</TableCell>

					<TableCell align="left" sx={{ fontSize: "15px" }}>
						{row.step.title}
					</TableCell>

					<TableCell align="left" style={{ color: "#67748E" }}>
						<DeletModal
							tahirlash={() => handleNavigate(row.id)}
							uchirish={() => handleDelete(row.id)}
						/>
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
											<Grid
												container
												sx={{
													with: "100%",
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												<Grid item lg={2} md={12} sm={12} xs={12}>
													<TableCell
														// component="th"
														scope="row"
														sx={{
															display: "flex",
															justifyContent: "space-between",
															flexWrap: "wrap",
														}}
													>
														<Typography sx={textstyle}>Nomi:</Typography>
														<Typography>{row.title}</Typography>
													</TableCell>
													<TableCell
														// component="th"
														scope="row"
														sx={{
															display: "flex",
															flexDirection: "row",
															justifyContent: "space-between",
														}}
													>
														<Typography sx={textstyle}>Fanlar:</Typography>
														<Typography>{row.subject.title}</Typography>
													</TableCell>
												</Grid>
												<Grid item lg={3} md={12} sm={12} xs={12}>
													<TableCell
														// component="th"
														scope="row"
														sx={{
															display: "flex",
															flexDirection: "row",
															justifyContent: "space-between",
														}}
													>
														<Typography sx={textstyle}>Malumaot:</Typography>
														<Typography>{row.desc}</Typography>
													</TableCell>
													<TableCell
														// component="th"
														scope="row"
														sx={{
															display: "flex",
															flexDirection: "row",
															justifyContent: "space-between",
														}}
													>
														<Typography sx={textstyle}>Bosqich: </Typography>
														<Typography>{row.step.title}</Typography>
													</TableCell>
												</Grid>
												<Grid item lg={3} md={12} sm={12} xs={12}>
													<TableCell
														// component="th"
														scope="row"
														sx={{
															display: "flex",
															flexDirection: "row",
															justifyContent: "space-between",
														}}
													>
														<Typography sx={textstyle}>
															Dars Kunlari:
														</Typography>
														<Typography
															sx={{ display: "flex", flexWrap: "wrap" }}
														>
															{numbar}
														</Typography>
													</TableCell>

													<TableCell
														// component="th"
														scope="row"
														sx={{
															display: "flex",
															flexDirection: "row",
															justifyContent: "space-between",
														}}
													>
														<Typography sx={textstyle}>Xona: </Typography>
														<Typography>{row.xona.title}</Typography>
													</TableCell>
												</Grid>

												<Grid item lg={4} md={12} sm={12} xs={12}>
													<TableCell
														// component="th"
														scope="row"
														sx={{
															display: "flex",
															flexDirection: "row",
															justifyContent: "space-between",
														}}
													>
														<Typography sx={textstyle}>
															Dars Boshlanishi:
														</Typography>
														<Typography> {darsBoshlanishi}</Typography>
													</TableCell>
													<TableCell
														// component="th"
														scope="row"
														sx={{
															display: "flex",
															flexDirection: "row",
															justifyContent: "space-between",
														}}
													>
														<Typography sx={textstyle}>
															Dasr Tugashi:
														</Typography>
														<Typography>{dasrTugashi}</Typography>
													</TableCell>
												</Grid>
											</Grid>
										</TableRow>
									</TableHead>
								</Table>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</>
		);
	}
	const handleDelete = (id) => {
		axios.delete(`http://localhost:8080/api/groups/${id}`).then(() => {
			getdata();
		});
	};

	return (
		<Box>
			<Navbar title="Guruh" />

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
								"NOMI",
								"MALUMOT",

								"HOLATI",
								"BOSQICH",
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
		</Box>
	);
};

export default Guruh;
