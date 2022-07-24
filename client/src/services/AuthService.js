import { $authHost, $host } from './index';

export default class AuthService {
	static async registration(user) {
		try {
			const { data } = await $host.post('auth/register', user);

			return data.successful;
		} catch (e) {
			alert(e.message);
		}
	}

	static async login(user) {
		try {
			const { data } = await $host.post('auth/login', user);

			const token = data.result.split(' ')[1];

			localStorage.setItem('token', token);

			return {
				name: data.user.name,
				email: data.user.email,
				token: token,
				role: data.user.role,
			};
		} catch (e) {
			alert(e.message);
		}
	}

	static async check() {
		try {
			if (!localStorage.getItem('token')) return {};

			const { data } = await $authHost.get('auth/check');

			return data.result;
		} catch (e) {
			console.log(e.response);
		}
	}
}
