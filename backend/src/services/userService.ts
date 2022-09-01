import UserModel from '../models/User';

export const findAll = () => UserModel.find();

export const findByEmail = (email: string) =>
	UserModel.findOne({ where: { email } });

export const findById = (id: string) => UserModel.findOne({ where: { id } });

export const create = (name: string, email: string, password: string) =>
	UserModel.create({ name, email, password });
