import { RegisterRequest } from "@interfaces/auth/RegisterRequest";
import { AuthResponse } from "@interfaces/auth/AuthResponse";
import Api from "@services/api";

export async function register(registerRequest: RegisterRequest) {
	const api = await Api.getInstance();
	const response = await api.post<RegisterRequest, AuthResponse>(
		registerRequest,
		{ url: "/auth/signup" }
	);
	return response;
}