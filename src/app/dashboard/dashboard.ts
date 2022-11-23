import "./dashboard.scss";
import template from "./dashboard.html";
import {Base} from "../base";
import {Options} from "vue-class-component";

@Options({
	template,
})
export class Dashboard extends Base {
	get albums() {
		return this.$store.state.albums;
	}

	/** Lifecycle */
	created() {
		this.init().catch(this.errorHandle);
	}

	/** Methods */
	async init() {
	}

	async createAlbum() {
		try {
			 console.log("create")
		} catch (err) {
			this.errorHandle(err);
		}
	}
}
