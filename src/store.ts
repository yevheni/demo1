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

		updateAlbum(state, album) {
			const index = state.albums.findIndex(el => el.id === album.id);

			if (index !== -1) {
				state.albums[index] = album;
			}
		},

		deleteAlbum(state, id) {
			const index = state.albums.findIndex(el => el.id === id);

			if (index !== -1) {
				state.albums.splice(index, 1);
			}
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

		async updateAlbum(context: ActionContext<State, any>, data) {
			const albumRes = await api.put(`/albums/${data.id}`, data);
			const album = albumRes.data;

			// console.log(album)

			context.commit("updateAlbum", album);
		},

		async deleteAlbum(context: ActionContext<State, any>, data) {
			const id = data.id;
			const albumRes = await api.delete(`/albums/${id}`);

			context.commit("deleteAlbum", id);
		},
	}
});
