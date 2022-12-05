import { defineComponent } from "vue";
import Loading from "@/components/loading/loading-spinner.vue";

export default defineComponent({
	components: {
		Loading,
	},

	data() {
		return {
			loading: false,
		};
	},

	created() {
		this.init().catch((err) => console.error(err));
	},

	methods: {
		async init() {
			this.loading = true;

			/** Load albums */
			await this.$store.dispatch("loadAlbums");

			this.loading = false;
		},
	},
});
