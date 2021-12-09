import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import VueCookies from "vue-cookies";
import axios from "axios";
import "element-theme-chalk";

Vue.use(VueCookies)
axios.defaults.baseURL = "http://localhost:8443/api";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
