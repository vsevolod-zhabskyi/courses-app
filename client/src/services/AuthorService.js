import { $authHost, $host } from './index';

export default class AuthorService {
	static async getAll() {
		try {
			const { data } = await $host.get('authors');

			return data.result;
		} catch (e) {
			console.log(e.response);
		}
	}

	static async create(name) {
		try {
			const { data } = await $authHost.post('authors', { name });

			return data.result;
		} catch (e) {
			console.log(e.response);
		}
	}
}
