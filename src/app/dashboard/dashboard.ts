import "./dashboard.scss";
import template from "./dashboard.html";
import {Base} from "../base";
import {Options} from "vue-class-component";
import {AlbumForm} from "./album-form/album-form";
import {default_data} from "../../helpers/default_data";

@Options({
	template,
	components: {
		AlbumForm,
	}
})
export class Dashboard extends Base {
	albumCreateOptions = {
		show: false,
		album: default_data.album,
	};
	albumEditOptions = {
		show: false,
		album: default_data.album,
	};

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
			/** Create album */
			await this.$store.dispatch("createAlbum", this.albumCreateOptions.album);

			/** Hide album form */
			this.hideCreateAlbum();

			/** Clear album form */
			this.albumCreateOptions.album = default_data.album;
		} catch (err) {
			this.errorHandle(err);
		}
	}

	async updateAlbum() {
		try {
			/** Update album */
			await this.$store.dispatch("updateAlbum", this.albumEditOptions.album);

			/** Hide album form */
			this.hideEditAlbum();
		} catch (err) {
			this.errorHandle(err);
		}
	}

	async deleteAlbum() {
		try {
			/** Delete album */
			await this.$store.dispatch("deleteAlbum", this.albumEditOptions.album);

			/** Hide album form */
			this.hideEditAlbum();
		} catch (err) {
			this.errorHandle(err);
		}
	}

	hideCreateAlbum() {
		this.albumCreateOptions.show = false;
	}

	showCreateAlbum() {
		this.albumCreateOptions.show = true;
	}

	hideEditAlbum() {
		this.albumEditOptions.album = default_data.album;
		this.albumEditOptions.show = false;
	}

	showEditAlbum(album: App.Album) {
		this.albumEditOptions.album = this.clone(album);
		this.albumEditOptions.show = true;
	}
}
