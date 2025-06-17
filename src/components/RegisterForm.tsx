import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/contexts/AuthContext";
import { RegisterRequest } from "@interfaces/auth/RegisterRequest";

export default function RegisterForm() {
	const authContext = useAuthContext();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<RegisterRequest>({
		email: "",
		passwd: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Validar contraseña mientras se escribe
		if (name === "passwd") {
			if (value.length > 0 && value.length < 12) {
				setPasswordError("La contraseña debe tener al menos 12 caracteres");
			} else {
				setPasswordError(null);
			}
		}
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setSuccessMessage(null);

		// Validar contraseña antes de enviar
		if (formData.passwd.length < 12) {
			setError("La contraseña debe tener al menos 12 caracteres");
			return;
		}

		setIsLoading(true);

		try {
			await authContext.register(formData);
			setSuccessMessage("¡Registro exitoso! Redirigiendo al dashboard...");
			setTimeout(() => navigate("/dashboard"), 2000);
		} catch (error) {
			console.error("Error al registrar:", error);
			setError(error instanceof Error ? error.message : "Error al registrarse");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="text-2xl font-bold text-gray-900">Crear cuenta</h2>
				<p className="mt-2 text-sm text-gray-600">
					Ingresa tus datos para comenzar
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Correo Electrónico
					</label>
					<div className="mt-1">
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
							placeholder="usuario@ejemplo.com"
						/>
					</div>
				</div>

				<div>
					<label htmlFor="passwd" className="block text-sm font-medium text-gray-700">
						Contraseña
					</label>
					<div className="mt-1">
						<input
							type="password"
							name="passwd"
							id="passwd"
							value={formData.passwd}
							onChange={handleChange}
							required
							minLength={12}
							className={`appearance-none block w-full px-3 py-2 border ${
								passwordError ? "border-red-300" : "border-gray-300"
							} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
							placeholder="Mínimo 12 caracteres"
						/>
					</div>
					{passwordError && (
						<p className="mt-1 text-sm text-red-600">{passwordError}</p>
					)}
					<p className="mt-1 text-xs text-gray-500">
						La contraseña debe tener al menos 12 caracteres
					</p>
				</div>

				<div>
					<button
						type="submit"
						disabled={isLoading || !!passwordError}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
					>
						{isLoading ? (
							<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						) : (
							"Registrarse"
						)}
					</button>
				</div>
			</form>

			{error && (
				<div className="rounded-md bg-red-50 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-red-800">{error}</h3>
						</div>
					</div>
				</div>
			)}

			{successMessage && (
				<div className="rounded-md bg-green-50 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-green-800">{successMessage}</h3>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
