import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Modal, Stack, Typography } from "@mui/material/node";
import React from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

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
export default ({ tahirlash, uchirish }) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
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
				<Typography
					fontSize="12px"
					fontWeight="bold"
					sx={{
						display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
					}}
				>
					o`chirish
				</Typography>
			</Button>
			<Button
				onClick={tahirlash}
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
						display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
					}}
				>
					tahrirlash
				</Typography>
			</Button>

			<Modal
				open={open}
				onClose={handleClose}
				hideBackdrop
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
								// onClick={handleClose}
								onClick={handleClose}
								sx={{
									width: "40%",
									height: "10%",
									bgcolor: "red",
									border: 1,
									color: "white",
									fontWeight: "bold",
									":hover": {
										border: 1,
										color: "red",
										borderColor: "red",
									},
								}}
							>
								Bekor qlish
							</Button>
							<Button
								// onClick={() => handleDelete(row.id)}
								onClick={uchirish}
								sx={{
									width: "40%",
									height: "10%",
									border: 1,
									fontWeight: "bold",
								}}
							>
								Tasdiqlash
							</Button>
						</Stack>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};
