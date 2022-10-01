import { hash } from 'bcrypt';
import UserModel from '../models/User';
import { UpdateUserProfileInput, UpdateUser } from '../resolvers/UserResolvers';

type QueryUsers = { name: { $regex: string; $options: string } };

export const findAll = (keyword: QueryUsers | {}) =>
	UserModel.find({ ...keyword });

export const findByEmail = (email: string) => UserModel.findOne({ email });

export const findById = (id: string) => UserModel.findById(id);

export const create = (name: string, email: string, password: string) =>
	UserModel.create({ name, email, password });

export const findByIdAndUpdate = async (
	userId: string,
	updateBody: UpdateUserProfileInput | UpdateUser
) => {
	if ('password' in updateBody) {
		const hashedPassword = await hash(updateBody.password!, 10);
		updateBody.password = hashedPassword;
	}

	return UserModel.findByIdAndUpdate(userId, updateBody, { new: true });
};

export const count = (keyword: QueryUsers | {}) =>
	UserModel.countDocuments({ ...keyword });
