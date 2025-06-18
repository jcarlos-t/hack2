import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import { ProtectedRoute } from "./ProtectedRoute";
import Login      from "@pages/LoginPage";
import Register   from "@pages/RegisterPage";
import Dashboard  from "@pages/DashboardPage";
import NotFound   from "@pages/NotFoundPage";
import RegistrarGasto   from "@pages/RegistrarGastoPage";
import ExpenseDetailsPage from "@pages/ExpenseDetailsPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <Login /> },
			{
				path: "auth",
				children: [
					{path: "login",    element: <Login /> },
					{path: "register",    element: <Register /> }
				],
			},
			{
				element: <ProtectedRoute />,
				children: [
					{path: "dashboard",    element: <Dashboard /> },
					{path: "registrar/gasto", element: <RegistrarGasto /> }
				],
			},
			{
				path: "expenses/details",
				element: <ExpenseDetailsPage />
			},
			{
				path: "*", element: <NotFound />
			},
		],
	},
]);
