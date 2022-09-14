import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/404";
import Dashboard from "../containers/Dashboard";
import Login from "../pages/Login";
import Auth from "../containers/Auth";
import Home from "../pages/Home";
import Guruh from "../pages/Guruh/Guruh";
import EditGuruh from "../pages/Guruh/EditGuruh";
import Intake from "../pages/Intake/Intake";
import Edit from "../pages/Intake/Edit";

import Tolov from "../pages/Tolov";
import Fanlar from "../pages/Fanlar";
import Bosqich from "../pages/Bosqich";
import AddBosqich from "../pages/Bosqich/AddBosqich";
import EditBosqich from "../pages/Bosqich/EditBosqich";
import IshHaqi from "../pages/IshHaqi";
import IshHaqiAdd from "../pages/IshHaqi/addSalary";
import Xarajat from "../pages/Xarajat";

import Xodim from "../pages/Xodim";
import EditXodim from "../pages/Xodim/editXodim";
import Attendance from "../pages/Attendance/index";

import Talaba from "../pages/Talaba";
import TalabaEdit from "../pages/Talaba/TalabaEdit";

import Xona from "../pages/Xona";
import Xonaadd from "../pages/Xona/Xonaadd";

import AttendanceCard from "../pages/Attendance";
import AttendanceTable from "../pages/Attendance/read";
import Fanadd from "../pages/Fanlar/Fanadd";
import Guruhlar from "../pages/Tolov/Guruhlar";

export const dashboardRoutes = [
	{
		element: <Dashboard />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/davomat", element: <Attendance /> },
			{ path: "/guruh", element: <Guruh /> },
			{ path: "/guruh/Form", element: <EditGuruh /> },
			{ path: "/qabul", element: <Intake /> },
			{ path: "/qabul/Edit", element: <Edit /> },
			{ path: "/tolov", element: <Tolov /> },
			{ path: "/tolov/guruhlar", element: <Guruhlar /> },
			// fanlar

			{ path: "/fanlar", element: <Fanlar /> },
			{
				path: "/fanlar/fanadd",
				element: <Fanadd />,
			},

			{ path: "/bosqich", element: <Bosqich /> },
			{ path: "/bosqich/addbosqich", element: <AddBosqich /> },
			{ path: "/bosqich/editbosqich", element: <EditBosqich /> },
			// IshHaqi
			{ path: "/ishHaqi", element: <IshHaqi /> },
			{ path: "/ishHaqi/add", element: <IshHaqiAdd /> },

			{ path: "/xarajat", element: <Xarajat /> },
			{ path: "/xodim", element: <Xodim /> },
			{ path: "/xodim/editXodim", element: <EditXodim /> },
			// davomat
			{ path: "/davomat", element: <AttendanceCard /> },
			{ path: "/davomat/table", element: <AttendanceTable /> },
			// talaba
			{ path: "/talaba", element: <Talaba /> },
			{ path: "/edittalaba", element: <TalabaEdit /> },

			// xona
			{ path: "/xona", element: <Xona /> },

			{ path: "/xona/xonaadd", element: <Xonaadd /> },
		],
	},
];

export const publicRoutes = [
	{
		element: <Auth />,
		children: [
			{ path: "/", element: <Login /> },
			{ path: "/login", element: <Login /> },
			{ path: "404", element: <NotFound /> },
			{ path: "*", element: <Navigate to="/login" /> },
		],
	},
];
