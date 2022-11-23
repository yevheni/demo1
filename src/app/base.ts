import {Options, Vue} from "vue-class-component";

@Options({})
export class Base extends Vue {
	errorHandle(err: Error) {
		const axios_message = (err as any)?.response?.data || "";

		console.error(axios_message || err);
	}

	wait(time = 0) {
		return new Promise<void>(resolve => {
			setTimeout(() => {
				resolve();
			}, time);
		});
	}

	clone<T>(data: T): T {
		return JSON.parse(JSON.stringify(data));
	}
}
