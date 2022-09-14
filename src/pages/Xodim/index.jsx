import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Grid, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import { Card, Chip, Modal } from "@mui/material";
import { Add, Delete, Edit, GridOnRounded } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

//service import
import get from "../../services/staff";

import Navbar from "../../components/Navbar";
import DeletModal from "../../components/DeletModal";

//modal style

export default () => {
	const [data, setData] = React.useState([]);
	const navigate = useNavigate();

	//modal states

	React.useEffect(() => {
		getdata();
	}, []);

	const getdata = () => {
		get.getStaff().then((resp) => {
			setData(resp);
			//   console.log(resp.data);
		});
	};

	const handleNavigate = (id) => {
		navigate("/xodim/editXodim", { state: id });
	};

	const navigateAdd = () => {
		navigate("/xodim/editXodim");
	};
	// console.log(data);
	function Row({ row, index }) {
		const [open, setOpen] = React.useState(false);

		return (
			<>
				{/* <Box><Navbar title='Xodim'/></Box> */}
				<React.Fragment>
					<TableRow
						onClick={() => setOpen(!open)}
						sx={{ "& > *": { borderBottom: "unset" } }}
					>
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
							{row.firstname}
						</TableCell>
						<TableCell align="left" sx={{ fontSize: "15px" }}>
							{row.lastname}
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
								<Box>
									<Table
										size="small"
										sx={{ width: "100%" }}
										aria-label="purchases"
									>
										<TableHead>
											<TableRow key={row.id}>
												<TableCell
													component="th"
													scope="row"
													sx={{ width: "11%" }}
												/>
												<TableCell
													sx={{ fontWeight: "bold", color: "gray" }}
													component="th"
													scope="row"
												>
													Foydalanuvchi nomi
												</TableCell>
												<TableCell
													sx={{ fontWeight: "bold", color: "gray" }}
													component="th"
													scope="row"
												>
													Tug`ulgan kun
												</TableCell>
												<TableCell
													sx={{ fontWeight: "bold", color: "gray" }}
													component="th"
													scope="row"
												>
													Manzil
												</TableCell>
												<TableCell
													sx={{ fontWeight: "bold", color: "gray" }}
													component="th"
													scope="row"
												>
													Lavozim
												</TableCell>
												<TableCell
													sx={{ fontWeight: "bold", color: "gray" }}
													component="th"
													scope="row"
												>
													Parol
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell />
												<TableCell>{row.username}</TableCell>
												<TableCell>{row.birthDate}</TableCell>
												<TableCell>{row.address}</TableCell>
												<TableCell>{row.role}</TableCell>
												<TableCell>{row.password}</TableCell>
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
		get.deleteStaff(id).then(() => {
			// setOpenModal(false);
			getdata();
		});
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Navbar title="Xodim" />
			<Box>
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
					Qo`shish
				</Button>
			</Box>
			<Card>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							{[
								"",
								"#",
								"Ism",
								"Familiya",
								"STATUS",
								"Telefon raqami",
								"Boshqarish",
							].map((item, id) => (
								<TableCell
									key={id}
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
		</Box>
	);
};
