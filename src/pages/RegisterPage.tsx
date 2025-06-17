import { useNavigate } from "react-router-dom";
import RegisterForm from "@components/RegisterForm";

export default function RegisterPage() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
			{/* Header simple */}
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<h1 className="ml-2 text-2xl font-bold text-gray-900">Ahorrista</h1>
						</div>
						<button
							onClick={() => navigate("/auth/login")}
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
						>
							<svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
							</svg>
							Iniciar Sesión
						</button>
					</div>
				</div>
			</header>

			{/* Contenido principal */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Lado izquierdo - Información */}
					<div className="space-y-8">
						<div className="space-y-4">
							<h2 className="text-4xl font-bold text-gray-900 leading-tight">
								Únete a <span className="text-purple-600">Ahorrista</span>
							</h2>
							<p className="text-xl text-gray-600 leading-relaxed">
								Crea tu cuenta y comienza a tomar el control de tus finanzas personales. 
								Registra gastos, establece metas y visualiza tu progreso de ahorro.
							</p>
						</div>

						{/* Beneficios */}
						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600">
										<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
										</svg>
									</div>
								</div>
								<div>
									<h3 className="text-lg font-medium text-gray-900">Registro Rápido</h3>
									<p className="text-gray-600">Solo necesitas email y contraseña para empezar</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
										<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
										</svg>
									</div>
								</div>
								<div>
									<h3 className="text-lg font-medium text-gray-900">Datos de Ejemplo</h3>
									<p className="text-gray-600">Recibe 10,000 gastos de ejemplo para probar la app</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-100 text-purple-600">
										<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
										</svg>
									</div>
								</div>
								<div>
									<h3 className="text-lg font-medium text-gray-900">100% Gratis</h3>
									<p className="text-gray-600">Sin costos ocultos, sin suscripciones</p>
								</div>
							</div>
						</div>

						{/* Requisitos */}
						<div className="bg-blue-50 rounded-lg p-6">
							<h3 className="text-lg font-medium text-blue-900 mb-3">Requisitos de la cuenta:</h3>
							<ul className="space-y-2 text-blue-800">
								<li className="flex items-center">
									<svg className="h-4 w-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									Email válido
								</li>
								<li className="flex items-center">
									<svg className="h-4 w-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									Contraseña de al menos 12 caracteres
								</li>
								<li className="flex items-center">
									<svg className="h-4 w-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									Email único (no registrado previamente)
								</li>
							</ul>
						</div>
					</div>

					{/* Lado derecho - Formulario de registro */}
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<RegisterForm />
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-white border-t border-gray-200 mt-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center text-gray-600">
						<p>&copy; 2024 Ahorrista. Desarrollado para el Hackathon de Desarrollo Frontend.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
