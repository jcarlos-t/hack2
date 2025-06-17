import { LoginRequest } from "@interfaces/auth/LoginRequest";
import { AuthResponse } from "@interfaces/auth/AuthResponse";
import Api from "@services/api";

export async function login(loginRequest: LoginRequest) {
	const api = await Api.getInstance();
	const response = await api.post<LoginRequest, AuthResponse>(
		loginRequest,
		{ url: "/authentication/login" }
	);
	
	if (response.data?.result?.token) {
		api.authorization = response.data.result.token;
	} else {
		throw new Error("Token no encontrado en la respuesta");
	}
	
	return response;
}