import { defineComponent } from "vue";
import { default_data } from "@/helpers/default_data";
import Loading from "@/components/loading/loading-spinner.vue";
import AlbumForm from "@/components/album-form/album-form.vue";
import * as toastr from "toastr";
import type { AxiosError } from "axios";

export default defineComponent({
	components: {
		Loading,
		AlbumForm,
	},

	data() {
		return {
			loading: false,
			albumCreateOptions: {
				show: false,
				album: default_data.album,
			},
			albumEditOptions: {
				show: false,
				album: default_data.album,
			},
		};
	},

	computed: {
		albums(): App.Album[] {
			return this.$store.state.albums;
		},
	},

	methods: {
		errorHandle(err: Error | AxiosError) {
			/** Hide loading spinner */
			this.loading = false;

			/** Check if error from axios */
			const axios_message =
				((err as AxiosError)?.response?.data as string) || "";
			console.error(axios_message || err);

			/** Show error toast */
			const message = axios_message || err.message;
			toastr.error(message);
		},

		clone<T>(data: T): T {
			return JSON.parse(JSON.stringify(data));
		},

		async createAlbum() {
			try {
				this.loading = true;

				/** Create album */
				await this.$store.dispatch(
					"createAlbum",
					this.albumCreateOptions.album
				);

				/** Hide album form */
				this.hideCreateAlbum();

				/** Clear album form */
				this.albumCreateOptions.album = default_data.album;

				this.loading = false;
			} catch (err) {
				this.errorHandle(err as Error);
			}
		},

		async updateAlbum() {
			try {
				this.loading = true;

				/** Update album */
				await this.$store.dispatch(
					"updateAlbum",
					this.albumEditOptions.album
				);

				/** Hide album form */
				this.hideEditAlbum();

				this.loading = false;
			} catch (err) {
				this.errorHandle(err as Error);
			}
		},

		async deleteAlbum() {
			try {
				this.loading = true;

				/** Delete album */
				await this.$store.dispatch(
					"deleteAlbum",
					this.albumEditOptions.album
				);

				/** Hide album form */
				this.hideEditAlbum();

				this.loading = false;
			} catch (err) {
				this.errorHandle(err as Error);
			}
		},

		hideCreateAlbum() {
			this.albumCreateOptions.show = false;
		},

		showCreateAlbum() {
			this.albumCreateOptions.show = true;
		},

		hideEditAlbum() {
			this.albumEditOptions.album = default_data.album;
			this.albumEditOptions.show = false;
		},

		showEditAlbum(album: App.Album) {
			this.albumEditOptions.album = this.clone(album);
			this.albumEditOptions.show = true;
		},
	},
});
