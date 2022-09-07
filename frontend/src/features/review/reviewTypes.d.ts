import { User } from '../user/userTypes';

export interface Review {
	id: string;
	rating: number;
	comment: string;
	user: Pick<User, 'id' | 'name'>;
}
