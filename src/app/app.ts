import "./app.scss";
import template from "./app.html";
import {Base} from "./base";
import {Options} from "vue-class-component";

@Options({
	template,
})
export class App extends Base {

	/** Lifecycle */
	created() {
		this.init().catch(this.errorHandle);
	}

	/** Methods */
	async init() {
		//
	}
}
