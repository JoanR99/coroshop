export interface LoginResponse {
	login: { accessToken: string };
}

export interface LogoutResponse {
	logout: { message: string };
}
