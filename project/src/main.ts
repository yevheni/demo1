import "./main.scss";
import { createApp } from "vue";
import router from "@/router";
import App from "@/app/app.vue";
import { store } from "@/store";
import toastr from "toastr";

toastr.options.closeButton = false;
toastr.options.timeOut = 5 * 1000;
toastr.options.extendedTimeOut = 10 * 1000;
toastr.options.progressBar = true;
toastr.options.positionClass = "toast-bottom-left";
toastr.options.closeDuration = 250;

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
