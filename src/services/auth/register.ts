import { RegisterRequest } from "@interfaces/auth/RegisterRequest";
import { RegisterResponse } from "@interfaces/auth/RegisterResponse";
import Api from "@services/api";

export async function register(registerRequest: RegisterRequest) {
	const api = await Api.getInstance();
	const response = await api.post<RegisterRequest, RegisterResponse>(
		registerRequest,
		{ url: "/authentication/register" }
	);
	
	if (response.data !== "OK") {
		throw new Error("Error en el registro");
	}
	
	return response;
}