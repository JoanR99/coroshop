import UserModel from '../models/User';

export const findAll = () => UserModel.find();

export const findByEmail = (email: string) => UserModel.findOne({ email });

export const findById = (id: string) => UserModel.findById(id);

export const create = (name: string, email: string, password: string) =>
	UserModel.create({ name, email, password });
