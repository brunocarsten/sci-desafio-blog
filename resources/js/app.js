import "./bootstrap";
import Vue from "vue";
import axios from "axios";
import VueAuth from "@websanova/vue-auth";
import VueAxios from "vue-axios";
import auth from "./src/config/auth";
import router from "./src/router/";

import store from './src/store/'

import vuetify from "./src/plugins/vuetify";

Vue.use(VueAxios, axios);
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`;
Vue.use(VueAuth, auth);

import App from "./src/App.vue";

new Vue({
    el: "#app",
    vuetify,
    components: { App },
    router,
    store
});
