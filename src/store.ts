import {ActionContext, createStore, Store} from "vuex";
import {api} from "./helpers/api";

const state = {
	albums: [] as App.Album[],
};

type State = typeof state;

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$store: Store<State>
	}
}

export const store = createStore({
	state() {
		return state;
	},

	mutations: {
		albums(state, payload) {
			state.albums = payload;
		},

		prependAlbum(state, album) {
			state.albums = [
				album,
				...state.albums,
			];
		},
	},

	actions: {
		async loadAlbums(context: ActionContext<State, any>) {
			const albumsRes = await api.get("/albums");
			const albums = albumsRes.data || [];

			// console.log(albums)

			context.commit("albums", albums);
		},

		async createAlbum(context: ActionContext<State, any>, data) {
			const albumRes = await api.post("/albums", data);
			const album = albumRes.data;

			// console.log(album)

			context.commit("prependAlbum", album);
		},
	}
});
