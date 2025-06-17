import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/contexts/AuthContext";
import { LoginRequest } from "@interfaces/auth/LoginRequest";

export default function LoginForm() {
	const authContext = useAuthContext();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<LoginRequest>({
		email: "",
		password: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);

		try {
			await authContext.login(formData);
			setSuccessMessage("Inicio de sesión exitoso");
			navigate("/dashboard"); // Redirige al dashboard
		} catch (err) {
			console.error("Error al iniciar sesión:", err);
			setError("Credenciales incorrectas");
		}
	}

	return (
		<section className="login-section bg-secondary p-4 rounded-2xl">
			<h1 className="text-2xl font-bold mb-4">Ingresar a Uber</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full p-2 rounded"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleChange}
						required
						className="w-full p-2 rounded"
					/>
				</div>
				<button
					id="loginSubmit"
					className="bg-primary text-white font-bold py-2 px-4 rounded-full"
					type="submit"
				>
					Iniciar Sesión
				</button>
			</form>
			{error && <div className="text-red-600 mt-2">{error}</div>}
			{successMessage && <div className="text-blue-600 mt-2">{successMessage}</div>}
		</section>
	);
}
