import React from "react";
import {
	Box,
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import Sayidbar from "../Sayidbar";
function handleClick(event) {
	event.preventDefault();
	console.info("You clicked a breadcrumb.");
}
export default (props) => {
	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{ minWidth: "220px", width: "100%" }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Sayidbar />
		</Box>
	);
	return (
		<Box sx={{ width: "98%", minWidth: "300px" }}>
			<Box
				sx={{
					color: "#7F7F7F",
					py: "0.5%",

					display: "flex",
					flexWrap: "wrap",

					justifyContent: "space-between",
				}}
			>
				<Grid container sx={{ py: "8px" }}>
					<Grid lg={8} xs={6} sm={8} md={9} item>
						<Box role="presentation" onClick={handleClick}>
							<Breadcrumbs aria-label="breadcrumb">
								<Link underline="hover" color="inherit" to="/">
									Bosh sahifa
								</Link>
								<Typography color="text.primary" fontWeight="bold">
									{props.title}
								</Typography>
							</Breadcrumbs>
						</Box>
					</Grid>
					<Grid lg={2} xs={6} sm={4} md={3} item>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<Box
								sx={{
									display: "flex",
									// justifyContent: "end",
									alignItems: "center",
									my: "2px",
									width: "100%",
								}}
							>
								<Button
									variant="text"
									sx={{ color: "black", display: "flex", alignItems: "center" }}
								>
									<PersonIcon />
									<Typography fontWeight="bold" fontSize="14px">
										Tizimga kirish
									</Typography>
								</Button>
							</Box>
							<Box
								sx={{
									display: {
										md: "flex",
										sm: "flex",
										md: "flex",
										lg: "none",
										xl: "none",
									},

									alignItems: "center",
									justifyContent: "center",
									my: "3%",
								}}
							>
								{["left"].map((anchor) => (
									<React.Fragment key={anchor}>
										<Button
											onClick={toggleDrawer(anchor, true)}
											sx={{ color: "black" }}
										>
											<MenuIcon />
										</Button>
										<Drawer
											anchor={anchor}
											open={state[anchor]}
											onClose={toggleDrawer(anchor, false)}
										>
											{list(anchor)}
										</Drawer>
									</React.Fragment>
								))}
							</Box>
						</Box>
					</Grid>

					<Grid lg={2} xs={12} sm={12} md={6} item>
						<Box sx={{ display: "flex", my: "1%" }}>
							<TextField
								id="outlined-textarea"
								placeholder="Izlash .."
								size="small"
								sx={{ bgcolor: "white", height: "40px" }}
								multiline
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<IconButton aria-label="delete">
												<SearchIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
