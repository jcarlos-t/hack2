import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/contexts/AuthContext";
import { LoginRequest } from "@interfaces/auth/LoginRequest";

export default function LoginForm() {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    passwd: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      await authContext.login(formData);
      setSuccessMessage("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales incorrectas");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-800">Bienvenido de nuevo</h2>
        <p className="mt-2 text-sm text-teal-900">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-teal-800">
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
              className="
                block w-full px-3 py-2 border border-teal-300 rounded-md shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-teal-400 focus:border-teal-700
              "
              placeholder="usuario@ejemplo.com"
            />
          </div>
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="passwd" className="block text-sm font-medium text-teal-800">
            Contraseña
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="passwd"
              id="passwd"
              value={formData.passwd}
              onChange={handleChange}
              required
              minLength={12}
              className="
                block w-full px-3 py-2 border border-teal-300 rounded-md shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-teal-400 focus:border-teal-700
                pr-10
              "
              placeholder="Mínimo 12 caracteres"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-
                       8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029
                       m5.858.908a3 3 0 114.243 4.243M9.878  
                       9.878l4.242 4.242"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943  
                       7.523 5 12 5c4.478 0 8.268  
                       2.943 9.542 7-1.274  
                       4.057-5.064 7-9.542 7
                       -4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-teal-700">
            La contraseña debe tener al menos 12 caracteres
          </p>
        </div>

        {/* Botón */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
              text-sm font-medium text-white bg-teal-700 hover:bg-teal-800
              focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2
              disabled:bg-teal-300 disabled:cursor-not-allowed transition-colors
            "
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0  
                     0 5.373 0 12h4zm2 5.291A7.962  
                     7.962 0 014 12H0c0 3.042 1.135  
                     5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </div>
      </form>

      {/* Mensajes */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0  
                     000 16zM8.707 7.293a1 1 0  
                     00-1.414 1.414L8.586 10l-1.293  
                     1.293a1 1 0 101.414  
                     1.414L10 11.414l1.293  
                     1.293a1 1 0 001.414-1.414L11.414  
                     10l1.293-1.293a1 1 0-
                     00-1.414-1.414L10 8.586  
                     8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="rounded-md bg-teal-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-teal-700" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16  
                     8 8 0 000 16zm3.707-9.293a1  
                     1 0 00-1.414-1.414L9 10.586  
                     7.707 9.293a1 1 0  
                     00-1.414 1.414l2 2a1 1  
                     0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-teal-800">{successMessage}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
