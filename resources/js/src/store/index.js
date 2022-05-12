import Vue from "vue";
import Vuex from "vuex";

import AuthModule from "../views/Auth/store";
import Tag from "../views/Admin/modules/tag";
import Post from "../views/Admin/modules/post";
import Snack from "../views/Admin/modules/snack";

Vue.use(Vuex);

const modules = {
    AuthModule,
    Tag,
    Post,
    Snack
};

export default new Vuex.Store({
    modules
});
