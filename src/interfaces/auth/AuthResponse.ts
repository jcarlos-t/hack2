export interface AuthResponse {
    status: number;
    message: string;
    result: {
        token: string;
        username: string;
    }
}