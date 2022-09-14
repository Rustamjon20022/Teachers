import { Box, Button, Divider, Grid, Input, Typography } from "@mui/material";
import React from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

import logo from "../../assets/logo.jpg";

import PaymentIcon from "@mui/icons-material/Payment";

import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MovingIcon from "@mui/icons-material/Moving";
import PaidIcon from "@mui/icons-material/Paid";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HomeIcon from "@mui/icons-material/Home";
import "./style.css";

const data = [
	{
		icon: <HomeIcon fontSize="10px" />,
		name: "Bosh Sahifa",
		href: "/",
	},
	{
		icon: <AddIcon fontSize="10px" />,
		name: "Qabul",
		href: "/qabul",
	},
	{
		icon: <CorporateFareIcon fontSize="10px" />,
		name: "Davomat",
		href: "/davomat",
	},

	{ icon: <GroupIcon fontSize="10px" />, name: "Guruh", href: "/guruh" },
	{ icon: <PaymentIcon fontSize="10px" />, name: "To'lov ", href: "/tolov" },
	{
		icon: <MenuBookIcon fontSize="10px" />,
		name: "Fanlar",
		href: "/fanlar",
	},
	{
		icon: <PersonSearchIcon fontSize="10px" />,
		name: "Talaba",
		href: "/talaba",
	},
	{ icon: <MeetingRoomIcon fontSize="10px" />, name: "Xona", href: "/xona" },
	{ icon: <MovingIcon fontSize="10px" />, name: "Bosqich", href: "/bosqich" },
	{
		icon: <PaidIcon fontSize="10px" />,
		name: "Ish haqi ",
		href: "/ishhaqi",
	},
	{
		icon: <CardTravelIcon fontSize="10px" />,
		name: "xarajat",
		href: "/xarajat",
	},
	{
		icon: <AccountBoxIcon fontSize="10px" />,
		name: "xodim",
		href: "/xodim",
	},
];
const Menu = data.map((item, index) => (
	<NavLink
		style={{ textDecoration: "none", position: "relative", zIndex: 100 }}
		to={item.href}
		key={index}
	>
		<Button
			variant="text"
			id="btnBox"
			sx={{
				width: "100%",
				px: "16px",
				py: "11px",
				color: "black",
				display: "flex",
				justifyContent: "start",
				borderRadius: 2,
				bgcolor: "transparent",
			}}
		>
			<Box
				className="iconNav"
				sx={{
					display: "flex",
					alignItems: "center",

					p: "9px",
					borderRadius: "22%",
					mr: "12px",
				}}
			>
				{item.icon}
			</Box>
			<Typography fontSize="14px" className="text">
				{item.name}
			</Typography>
		</Button>
	</NavLink>
));

export default () => {
	return (
		<Box
			id="saidbar"
			sx={{
				width: "100%",
				height: "100%",
				// bgcolor: "#f8f9fa",
			}}
		>
			<Grid container sx={{ width: "100%" }}>
				<Grid lg={12} xs={0} sm={0} md={12} item>
					<Box
						sx={{
							width: "100%",

							height: "100vh",
							overflowY: "scroll",
							msOverflowStyle: "none",
							scrollbarWidth: "none",
							"::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						<Box
							sx={{
								width: "100%",
								display: "flex",
								py: "24px",
								justifyContent: "center",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<img
								src={logo}
								alt=""
								width="32px"
								style={{ borderRadius: "50%" }}
							/>
							<Typography
								sx={{ fontSize: "14px", ml: "5px", fontWeight: "bold" }}
							>
								Codemy
							</Typography>
						</Box>
						<Divider variant="inset" sx={{ mx: "10%" }} />
						<Box
							sx={{
								mx: "16px",
								mt: "16px",
								display: "flex",
								flexDirection: "column",
								gap: "1.5px",
								pb: "30px",
							}}
						>
							{Menu}
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};
