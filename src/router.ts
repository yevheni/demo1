import {createRouter, createWebHistory} from "vue-router";
import {Dashboard} from "./app/dashboard/dashboard";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/:pathMatch(.*)*',
			component: Dashboard,
		},
	],
});

export {router}
