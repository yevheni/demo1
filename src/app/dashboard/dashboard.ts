import "./dashboard.scss";
import template from "./dashboard.html";
import {Base} from "../base";
import {Options} from "vue-class-component";

@Options({
	template,
})
export class Dashboard extends Base {
	/** Lifecycle */
	created() {
		this.init().catch(this.errorHandle);
	}

	/** Methods */
	async init() {
		//
	}
}
