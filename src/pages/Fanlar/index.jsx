import { Add, Delete, Edit } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Card, Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Grid, Stack } from "@mui/material/node";
import Modal from "@mui/material/node/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import Navbar from "../../components/Navbar";
import DeletModal from "../../components/DeletModal";

export default () => {
	const [data, setData] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		getdata();
	}, []);

	const getdata = () => {
		axios.get("http://localhost:8080/api/subjects").then((resp) => {
			setData(resp.data);
			console.log(resp.data);
		});
	};

	const handleNavigate = (id) => {
		navigate("/fanlar/fanadd", { state: id });
	};

	const navigateAdd = () => {
		navigate("/fanlar/fanadd");
	};

	const handleDelete = (id) => {
		axios.delete(`http://localhost:8080/api/subjects/${id}`).then(() => {
			getdata();
		});
	};
	// console.log(data);
	function Row({ row, index }) {
		return (
			<>
				<React.Fragment>
					<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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

						<TableCell align="left" style={{ color: "#67748E" }}>
							<DeletModal
								tahirlash={() => handleNavigate(row)}
								uchirish={() => handleDelete(row.id)}
							/>
						</TableCell>
					</TableRow>
				</React.Fragment>
			</>
		);
	}

	return (
		<>
			<Navbar title="Fanlar" />
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
							{["#", "FANLAR", "MALUMOT", "BOSHQARUV"].map((item, id) => (
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
		</>
	);
};
