import bcrypt from 'bcrypt';
import UserModel from '../../models/User';
import { VALID_CREDENTIALS } from './constants';

type Credentials = {
	name: string;
	email: string;
	password: string | Promise<string>;
	isAdmin: boolean;
};

export const createUser = async (
	credentials: Partial<Credentials> = { ...VALID_CREDENTIALS, name: 'user' }
) => {
	credentials.password = await bcrypt.hash(credentials.password as string, 10)!;
	return UserModel.create({ ...credentials });
};
