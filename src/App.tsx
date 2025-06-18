import Navbar from "@components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsAuthenticated(!!token);
	}, [location]);

	return (
		<>
			{isAuthenticated && <Navbar />}
			<Outlet />
		</>
	);
}
