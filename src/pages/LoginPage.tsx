import { useNavigate } from "react-router-dom";
import LoginForm from "@components/LoginForm";

export default function LoginPage() {
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
							onClick={() => navigate("/auth/register")}
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
						>
							<svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
							</svg>
							Registrarse
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
								Controla tus gastos,{" "}
								<span className="text-purple-600">alcanza tus metas</span>
							</h2>
							<p className="text-xl text-gray-600 leading-relaxed">
								Ahorrista te ayuda a visualizar y controlar tus gastos personales de manera inteligente. 
								Registra tus gastos, establece metas de ahorro y toma el control de tus finanzas.
							</p>
						</div>

						{/* Características */}
						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600">
										<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
										</svg>
									</div>
								</div>
								<div>
									<h3 className="text-lg font-medium text-gray-900">Visualización Inteligente</h3>
									<p className="text-gray-600">Resúmenes mensuales por categoría con gráficos interactivos</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
										<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
										</svg>
									</div>
								</div>
								<div>
									<h3 className="text-lg font-medium text-gray-900">Metas de Ahorro</h3>
									<p className="text-gray-600">Define y alcanza tus metas mensuales de ahorro</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-100 text-purple-600">
										<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
										</svg>
									</div>
								</div>
								<div>
									<h3 className="text-lg font-medium text-gray-900">Seguridad Total</h3>
									<p className="text-gray-600">Autenticación JWT y datos protegidos</p>
								</div>
							</div>
						</div>

						{/* Estadísticas */}
						<div className="grid grid-cols-3 gap-6 pt-6">
							<div className="text-center">
								<div className="text-2xl font-bold text-purple-600">10K+</div>
								<div className="text-sm text-gray-600">Gastos de ejemplo</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">100%</div>
								<div className="text-sm text-gray-600">Gratis</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-green-600">24/7</div>
								<div className="text-sm text-gray-600">Disponible</div>
							</div>
						</div>
					</div>

					{/* Lado derecho - Formulario de login */}
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<LoginForm />
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
