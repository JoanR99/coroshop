export type LoginResponse = {
	login: { accessToken: string };
};

export type LogoutResponse = {
	logout: { message: string };
};

export type LoginInput = {
	email: string;
	password: string;
};
