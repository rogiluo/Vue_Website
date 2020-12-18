import "core-js/es6/promise"
import "core-js/es6/string"
import "core-js/es7/array"
import "./assets/css/site.css"
import "vue-loading-overlay/dist/vue-loading.css"
import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import App from "@/App"
import router from "@/router"
import VueSweetalert2 from "vue-sweetalert2"
import Loading from "vue-loading-overlay";
import VueClipboard from 'vue-clipboard2';
import Vuelidate from 'vuelidate';
import ApiCaller from "./js/ApiCaller";

Vue.use(Loading, {
  color: "#0000FF",
  loader: "spinner",
  width: 128,
  height: 128,
  backgroundColor: "#FFFFFF"
});
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(VueClipboard);
Vue.use(Vuelidate);
Vue.prototype.$ApiCaller = ApiCaller;

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  },
  render: h => h(App)
})