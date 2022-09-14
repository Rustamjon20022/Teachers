import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import Root from "./root";
import "./Index.css";
const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<SnackbarProvider maxSnack={3}>
			<Root />
		</SnackbarProvider>
	</StrictMode>
);
