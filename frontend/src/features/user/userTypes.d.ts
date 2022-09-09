export interface User {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

export interface AddUserResponse {
	addUser: { message: string };
}
