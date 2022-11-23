import "./component_.scss";
import template from "./component_.html";
import {Base} from "../base";
import {Options} from "vue-class-component";

@Options({
	template,
})
export class Component_ extends Base {
	/** Lifecycle */
	created() {
		this.init().catch(this.errorHandle);
	}

	/** Methods */
	async init() {
		//
	}
}
