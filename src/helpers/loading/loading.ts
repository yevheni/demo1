import "./loading.scss";
import template from "./loading.html";
import {App} from "vue";

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$loading: any,
	}
}

export function createLoadingInstance(_this: any) {
	let _state = false;
	let el = null as HTMLElement;

	Object.defineProperty(_this, "$loading", {
		get() {
			return _state;
		},
		set(state: any) {
			// console.log(state, _this)

			_state = state;

			if (state) {
				if (!el) {
					const div = document.createElement("div");
					div.innerHTML = template;
					el = div.firstChild as HTMLElement;

					setTimeout(() => {
						if (_this.$el) {
							_this.$el.append(el);
						} else {
							console.warn(`$loading helper: component's $el is not set`);
						}
					});
				}
			} else {
				setTimeout(() => {
					try {
						el?.remove();
					} catch (err) {
						//
					}

					el = "" as any;
				})
			}
		}
	})
}

export const LoadingPlugin = {
	install(app: App) {
		app.mixin({
			beforeCreate() {
				createLoadingInstance(this);
			}
		});
	}
}
