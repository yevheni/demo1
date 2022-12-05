import { createRouter, createWebHistory } from "vue-router";
import Home from "@/app/views/home/home-view.vue";
import NotFound from "@/app/views/not-found/not-found.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},

		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: NotFound,
		},
	],
});

export default router;
