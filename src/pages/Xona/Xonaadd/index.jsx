// import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// import { useEffect } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   Container,
//   Grid,
//   TextField,
//   Typography,
// } from "@mui/material";

// export default () => {

//   const [formData, setFormData] = useState({
//     title: "",
//     desc: "",
//   });

//   useEffect(() => {
//     if (bittaID) {
//       getdata();
//     }
//   }, []);

//   const getdata = () => {
//     axios.get(`http://localhost:8080/api/rooms/${bittaID}`).then((resp) => {
//       setFormData({
//         ...formData,
//         title: resp.data.title,
//         desc: resp.data.desc,
//       });
//     });
//   };

//   const Submit = () => {
//     if (bittaID) {
//       axios
//         .put(`http://localhost:8080/api/rooms/${bittaID}`, formData)
//         .then(() => {
//           navigate("/xona", { replace: true });
//         })
//         .catch((err) => console.log(err));
//     } else {
//       axios.post("http://localhost:8080/api/rooms", formData).then(() => {
//         navigate("/xona");
//       });
//     }
//   };

//   return (
//     <Card sx={{ paddingBottom: 50 }}>
//       <Container maxWidth="md">
//         <Typography sx={{ marginY: 5 }} variant="h4">
//           {bittaID ? "Tahrirlash" : "Qo'shish"}
//         </Typography>

//         <Grid container columns={12}>
//           <Grid
//             item
//             xs={12}
//             md={6}
//             lg={6}
//             sm={6}
//             sx={{ marginTop: { md: 3, xs: 3 } }}
//           >
//             <TextField
//               name="dsfdsf"
//               id="input-with-icon-textfield1"
//               label="Ismi"
//               sx={{ width: "90%" }}
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   title: e.target.value,
//                 })
//               }
//             />
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             md={6}
//             lg={6}
//             sm={6}
//             sx={{ marginTop: { md: 3, xs: 3 } }}
//           >
//             <TextField
//               id="input-with-icon-textfield2"
//               label="Familya"
//               sx={{ width: "90%" }}
//               value={formData.desc}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   desc: e.target.value,
//                 })
//               }
//             />
//           </Grid>
//         </Grid>
//         <Box
//           sx={{
//             mt: 2,
//             width: "100%",
//             display: "flex",
//             justifyContent: "end",
//             gap: 2,
//           }}
//         >
//           <Button
//             onClick={() => navigate("/xona")}
//             id="statusOffGR"
//             sx={{
//               backgroundColor: "green",
//               px: "2%s",
//               color: "#fff",
//               ":hover": {
//                 backgroundColor: "green",
//                 color: "#fff",
//               },
//             }}
//           >
//             Bekor qilish
//           </Button>
//           <Button
//             onClick={Submit}
//             sx={{
//               backgroundColor: "green",
//               px: "8%",
//               py: "1%",
//               color: "#fff",
//               ":hover": {
//                 backgroundColor: "green",
//                 color: "#fff",
//               },
//             }}
//           >
//             {bittaID ? "Yanglash" : "Qo'shish"}
//           </Button>
//         </Box>
//       </Container>
//     </Card>
//   );
// };

import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
	Box,
	Button,
	Card,
	Grid,
	InputBase,
	Switch,
	TextField,
	Typography,
} from "@mui/material";

export default () => {
	const navigate = useNavigate();
	const { state: bittaID } = useLocation();
	const formik = useFormik({
		initialValues: {
			title: "",
			desc: "",
		},
		onSubmit: (values) => {
			if (bittaID) {
				axios
					.put(`http://localhost:8080/api/rooms/${bittaID}`, values)
					.then(() => {
						navigate("/xona", { replace: true });
					})
					.catch((err) => console.log(err));
			} else {
				axios.post("http://localhost:8080/api/rooms", values).then(() => {
					navigate("/xona");
				});
			}
		},
	});
	useEffect(() => {
		if (bittaID) {
			getdata();
		}
	}, []);
	const getdata = () => {
		axios.get(`http://localhost:8080/api/rooms/${bittaID}`).then((resp) => {
			console.log("====================================");
			console.log(resp.data);
			console.log("====================================");
			formik.setValues({
				...formik.values,
				title: resp.data.title,
				desc: resp.data.desc,
			});
			formik(resp.data);
		});
	};

	const data = [
		{
			id: "title",
			placeholder: "Xona",
			name: "title",
			type: "text",
			value: formik.values.title,
		},
		{
			id: "desc",
			placeholder: "Ma'lumot",
			name: "desc",
			type: "text",
			value: formik.values.desc,
		},
	];

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card sx={{ p: "5%" }}>
				<Typography variant="h4" sx={{}}>
					{bittaID ? "Tahririlash" : "Xona qo'shish"}
				</Typography>
				<Grid container>
					{data.map((item, idx) => (
						<Grid
							key={idx}
							itme
							xs={12}
							sm={6}
							md={6}
							lg={6}
							xl={6}
							sx={{ mt: 2 }}
						>
							<TextField
								label={item.placeholder}
								id={item.id}
								name={item.name}
								type={item.type}
								onChange={formik.handleChange}
								value={item.value}
								sx={{
									width: "90%",
								}}
							/>
						</Grid>
					))}
				</Grid>
				<Box
					sx={{
						mt: 2,
						width: "95%",
						display: "flex",
						justifyContent: "end",
						gap: 2,
					}}
				>
					<Button
						onClick={() => navigate("/xona")}
						id="statusOffGR"
						sx={{
							backgroundColor: "green",
							px: "2%s",
							color: "#fff",
							":hover": {
								backgroundColor: "green",
								color: "#fff",
							},
						}}
					>
						Bekor qilish
					</Button>
					<Button
						type="Submit"
						sx={{
							backgroundColor: "green",
							px: "8%",
							py: "1%",
							color: "#fff",
							":hover": {
								backgroundColor: "green",
								color: "#fff",
							},
						}}
					>
						{bittaID ? "Yanglash" : "Qo'shish"}
					</Button>
				</Box>
			</Card>
		</form>
	);
};
