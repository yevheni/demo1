import { createStore } from "vuex";
import { api } from "@/helpers/api";

const state = {
	albums: [] as App.Album[],
};

export type State = typeof state;

export const store = createStore({
	state() {
		return state;
	},

	mutations: {
		albums(state, payload: App.Album[]) {
			state.albums = payload;
		},

		prependAlbum(state, album: App.Album) {
			state.albums = [album, ...state.albums];
		},

		updateAlbum(state, album: App.Album) {
			const index = state.albums.findIndex((el) => el.id === album.id);

			if (index !== -1) {
				state.albums[index] = album;
			}
		},

		deleteAlbum(state, id: number) {
			const index = state.albums.findIndex((el) => el.id === id);

			if (index !== -1) {
				state.albums.splice(index, 1);
			}
		},
	},

	actions: {
		async loadAlbums(context) {
			const albumsRes = await api.get("/albums");
			const albums = albumsRes.data || [];
			context.commit("albums", albums);
		},

		async createAlbum(context, data) {
			const albumRes = await api.post("/albums", data);
			const album = albumRes.data;
			context.commit("prependAlbum", album);
		},

		async updateAlbum(context, data) {
			const albumRes = await api.put(`/albums/${data.id}`, data);
			const album = albumRes.data;
			context.commit("updateAlbum", album);
		},

		async deleteAlbum(context, data) {
			const id = data.id;
			await api.delete(`/albums/${id}`);
			context.commit("deleteAlbum", id);
		},
	},
});
