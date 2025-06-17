import { getRoleBasedOnToken } from "src/utils/getRoleBasedOnToken";

export default function DashboardPage() {
	const role = getRoleBasedOnToken();

	return (
		<main className="p-10">
			<h1 className="text-3xl font-bold mb-4">Bienvenido al Dashboard</h1>
			<div className="bg-gray-100 p-4 rounded-xl shadow">
				<p className="text-lg">Tu rol es:</p>
				<p className="text-2xl font-semibold text-primary">{role}</p>
			</div>
		</main>
	);
}
