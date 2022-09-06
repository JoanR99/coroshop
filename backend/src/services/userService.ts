import { hash } from 'bcrypt';
import UserModel from '../models/User';
import {
	UpdateUserProfileInput,
	UpdateUserProfile,
} from '../resolvers/UserResolvers';

export const findAll = () => UserModel.find();

export const findByEmail = (email: string) => UserModel.findOne({ email });

export const findById = (id: string) => UserModel.findById(id);

export const create = (name: string, email: string, password: string) =>
	UserModel.create({ name, email, password });

export const findByIdAndUpdate = async (
	userId: string,
	updateBody: UpdateUserProfileInput | UpdateUserProfile
) => {
	if (updateBody.password) {
		const hashedPassword = await hash(updateBody.password, 10);
		updateBody.password = hashedPassword;
	}

	return UserModel.findByIdAndUpdate(userId, updateBody, { new: true });
};
