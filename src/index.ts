import "./index.scss";
import {App} from "./app/app";
import {store} from "./store";
import {router} from "./router";
import {createApp} from "vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
