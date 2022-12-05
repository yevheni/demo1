import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		album: {
			type: Object as PropType<App.Album>,
			default: null,
		},
	},

	emits: {
		cancel() {
			return true;
		},
		confirm() {
			return true;
		},
		delete() {
			return true;
		},
	},

	computed: {
		is_edit(): boolean {
			return typeof this.album?.id !== "undefined";
		},
	},

	methods: {
		onBackdrop(e: Event) {
			const target = e.target as HTMLElement;

			if (target.dataset.backdrop === "1") {
				this.cancel();
			}
		},

		cancel() {
			this.$emit("cancel");
		},

		confirm() {
			this.$emit("confirm");
		},

		delete_() {
			this.$emit("delete");
		},
	},
});
