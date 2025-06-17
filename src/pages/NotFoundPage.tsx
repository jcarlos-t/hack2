import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md text-center">
				<h1 id="notFound" className="text-4xl font-bold text-gray-800 mb-4">
					404 - Página No Encontrada
				</h1>
				<p className="text-gray-600 mb-6">
					Lo sentimos, la página que buscas no existe.
				</p>
				<button
					id="historyBack"
					onClick={handleGoBack}
					className="bg-primary text-white font-bold py-2 px-6 rounded-full cursor-pointer hover:bg-primary-dark transition-colors"
				>
					Volver Atrás
				</button>
			</div>
		</main>
	);
}