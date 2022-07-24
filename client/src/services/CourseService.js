import { $authHost, $host } from './index';

export default class CourseService {
	static async getAll() {
		try {
			const { data } = await $host.get('courses');

			return data.result;
		} catch (e) {
			console.log(e.response);
		}
	}

	static async getById(id) {
		const { data } = await $host.get(`courses/${id}`);

		return data.result;
	}

	static async create(course) {
		try {
			const { data } = await $authHost.post('courses', course);

			return data.result;
		} catch (e) {
			console.log(e.response);
		}
	}

	static async delete(id) {
		try {
			await $authHost.delete(`courses/${id}`);

			return id;
		} catch (e) {
			console.log(e.response);
		}
	}

	static async update(course) {
		try {
			delete course.id;

			const { data } = await $authHost.put(`courses/${course.id}`, course);

			return data.result;
		} catch (e) {
			console.log(e.response);
		}
	}
}
