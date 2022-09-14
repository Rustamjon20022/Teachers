import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { BiCoinStack, BiWorld, BiRocket } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import person from "../../assets/img.jpg";
import { FcDiploma1 } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineArrowUp } from "react-icons/ai";
import { MdListAlt, MdOutlineBuild } from "react-icons/md";
import racet from "../../assets/download.webp";
import LineChart from "../../components/Charts/LineChart";
import ColumnCharts from "../../components/Charts/ColumnCharts";
import Navbar from "../../components/Navbar";
function Dashboard(props) {
	const data1 = [
		{
			title: "Users",
			icon: <MdListAlt />,
			text: "36K",
		},
		{
			title: "Clicks",
			icon: <BiRocket />,
			text: "36K",
		},
		{
			title: "Sales",
			icon: <MdListAlt />,
			text: "36K",
		},
		{
			title: "Items",
			icon: <MdOutlineBuild />,
			text: "36K",
		},
	];
	const data = [
		{
			title: "Today's Money",
			number: "$53,000",
			pracent: "+55",
			icon: <BiCoinStack />,
		},
		{
			title: "Today's Users",
			number: "2,300 ",
			pracent: "+3",
			icon: <BiWorld />,
		},
		{
			title: "New Clients",
			number: "+3,462",
			pracent: "-2",
			icon: <FcDiploma1 />,
		},
		{
			title: "Sales",
			number: "$103,430",
			pracent: "+5",
			icon: <FaShoppingCart />,
		},
	];
	return (
		<>
			<Navbar title="Bosh sahifa" />
			<Grid container={2} spacing={2}>
				{data.map((item, index) => (
					<Grid
						sx={{ display: "flex" }}
						key={index}
						item
						xs={12}
						sm={6}
						md={6}
						lg={3}
						xl={3}
					>
						<Box
							sx={{
								width: "100%",
								p: 1,
								display: "flex",
								justifyContent: "space-between",
								borderRadius: 2,
								bgcolor: "white",
								boxShadow: "5px 5px 15px 0.1px #CCCDCE",
							}}
						>
							<Box>
								<Typography sx={{ fontSize: 14, color: "#67748E" }}>
									{item.title}
								</Typography>
								<Typography>
									<Typography
										variant="span"
										sx={{ color: "#344767", fontWeight: 550, fontSize: 18 }}
									>
										{item.number}
									</Typography>
									<Typography
										variant="span"
										sx={{
											fontSize: 13,
											pl: 1,
											fontWeight: 900,
											color: item.pracent > 0 ? "#82D62C" : "red",
										}}
									>
										{item.pracent}%
									</Typography>
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 50,
									height: 50,
									borderRadius: 2,
									background: "linear-gradient(120deg, #ED068A, #8B23C1)",
									color: "white",
									fontSize: 20,
								}}
							>
								{item.icon}
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
			<br />
			<br />
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
					<Box
						sx={{
							display: { md: "flex", sm: "block" },
							justifyContent: "space-between",
							p: 2,
							bgcolor: "white",
							borderRadius: 5,
							boxShadow: "5px 5px 15px 0.1px #CCCDCE",
						}}
					>
						<Box>
							<Typography
								sx={{ fontSize: 16, color: "#67748E", fontWeight: "550" }}
							>
								Built by developers
							</Typography>
							<Typography
								sx={{
									color: "#344767",
									fontWeight: 550,
									fontSize: 18,
									pt: 1,
									pb: 1,
								}}
							>
								Soft UI Dashboard
							</Typography>
							<Typography sx={{ fontSize: 16, color: "#67748E" }}>
								From colors, cards, typography to complex elements, you will
								find the full documentation.
							</Typography>
							<Box sx={{ mt: 6 }} />
							<Button
								sx={{
									p: 0,
									fontSize: 12,
									color: "#67748E",
								}}
							>
								Read More
								<BsArrowRightShort size={"20px"} />
							</Button>
						</Box>
						<br />
						<Box
							sx={{
								width: "100%",
								borderRadius: 5,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								background: "linear-gradient(120deg, #ED068A, #8B23C1)",
							}}
						>
							<img src={racet} style={{ width: "100%" }} />
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
					<Box
						sx={{
							borderRadius: 5,
							bgcolor: "white",
							p: 2,
							boxShadow: "5px 5px 15px 0.1px #CCCDCE",
						}}
					>
						<Box
							sx={{
								backgroundImage: `url(${person})`,
								backgroundSize: "cover",
								backgroundColor: "rgba(255, 99, 71, 0.4)",
								// bgcolor: "rgba(255, 99, 71, 0.4)",
								p: 2,
								borderRadius: 5,
							}}
						>
							<Typography
								sx={{
									color: "white",
									fontWeight: 550,
									fontSize: 20,
									pt: 1,
									pb: 3,
								}}
							>
								Work with the rockets
							</Typography>
							<Typography sx={{ fontSize: 18, color: "white" }}>
								Wealth creation is an evolutionarily recent positive-sum game.
								It is all about who take the opportunity first.
							</Typography>
							<Button
								sx={{
									mt: 2,
									p: 0,
									fontSize: 12,
									color: "white",
								}}
							>
								Read More
								<BsArrowRightShort size={"20px"} />
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
					<Box
						sx={{
							p: 2,
							bgcolor: "white",
							borderRadius: 5,
							boxShadow: "5px 5px 15px 0.1px #CCCDCE",
						}}
					>
						<ColumnCharts />
						<Box sx={{ pl: 2, color: "#344767", width: "100%" }}>
							<Typography sx={{ fontSize: 18, fontWeight: "550" }}>
								Sales overview
							</Typography>
							<Typography sx={{ fontSize: 14, fontWeight: "550" }}>
								<AiOutlineArrowUp />
								4% more in 2021
							</Typography>
						</Box>
						<Grid container sx={{ ml: 2, mt: 3 }}>
							{data1.map((val, _id) => (
								<Grid item xs={3} key={_id}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
										}}
									>
										<Box
											sx={{
												border: 1,
												borderRadius: 2,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												p: 0.5,
											}}
										>
											{val.icon}
										</Box>
										<Typography sx={{ fontSize: 12 }}>{val.title}</Typography>
									</Box>
									<Typography
										sx={{
											mt: 2,
											color: "#344767",
											fontSize: 20,
											fontWeight: 550,
										}}
									>
										{val.text}
									</Typography>
									<Typography>
										<LinearProgress
											sx={{
												width: "90%",
												color: "#344767",
												borderRadius: 1,
											}}
											variant="determinate"
											value={25}
											{...props}
											color="inherit"
										/>
									</Typography>
								</Grid>
							))}
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
					<Box
						sx={{
							borderRadius: 5,
							bgcolor: "white",
							p: 2,
							boxShadow: "5px 5px 15px 0.1px #CCCDCE",
						}}
					>
						<Box sx={{ pl: 2, color: "#344767" }}>
							<Typography sx={{ fontSize: 18, fontWeight: "550" }}>
								Sales overview
							</Typography>
							<Typography sx={{ fontSize: 14, fontWeight: "550" }}>
								<AiOutlineArrowUp />
								4% more in 2021
							</Typography>
						</Box>
						<LineChart />
					</Box>
				</Grid>
			</Grid>
		</>
	);
}

export default Dashboard;
