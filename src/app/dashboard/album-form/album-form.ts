import "./album-form.scss";
import template from "./album-form.html";
import {Options, Vue} from "vue-class-component";
import {Emit, Prop} from "vue-property-decorator";

@Options({
	template,
})
export class AlbumForm extends Vue {
	@Prop({ default: false }) show: boolean;
	@Prop({ default: null }) album: App.Album;
	@Prop({ default: false }) showDelete: boolean;

	/** Lifecycle */
	created() {
		//
	}

	/** Methods */
	onBackdrop(e: Event) {
		const target = e.target as HTMLElement;

		if (target.dataset.backdrop === "1") {
			this.cancel()
		}
	}

	@Emit()
	cancel() {
		//
	}

	@Emit()
	confirm() {
		//
	}

	@Emit("delete")
	delete_() {
		//
	}
}
