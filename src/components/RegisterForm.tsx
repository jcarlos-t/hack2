import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/contexts/AuthContext";

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: "USER" | "ADMIN";
}

export default function RegisterForm() {
	const authContext = useAuthContext();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		role: "USER", // Valor por defecto
	});

	function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			await authContext.register(formData);
			alert("Registro exitoso!");
			navigate("/dashboard");
		} catch (error) {
			console.error("Error al registrar:", error);
			alert("Error al registrarse");
		}
	}

	return (
		<section className="login-section bg-secondary p-4 rounded-2xl">
			<h1 className="text-2xl font-bold">Registrarse a Uber</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="firstName">Nombres</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="lastName">Apellidos</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						value={formData.lastName}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="role">Rol</label>
					<select
						name="role"
						id="role"
						value={formData.role}
						onChange={handleChange}
						required
					>
						<option value="USER">Usuario</option>
						<option value="ADMIN">Administrador</option>
					</select>
				</div>
				<button
					id="registerSubmit"
					className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
					type="submit"
				>
					Registrarse
				</button>
			</form>
		</section>
	);
}
