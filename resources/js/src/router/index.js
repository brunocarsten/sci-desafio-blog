import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Login from "../views/Auth/login.vue";
import Posts from "../views/Admin/dashboard.vue";
import Tags from "../views/Admin/tag.vue";

import Admin from "../views/Admin";
import Home from "../views/Site/home.vue";
import Post from "../views/Site/post.vue";

const routes = [
    {
        path: "/",
        name: "site",
        component: Home
    },
    {
        path: "/post",
        name: "post",
        component: Post
    },

    {
        path: "/painel",
        component: Admin,
        children: [
            {
                path: "",
                name: "login",
                component: Login,
                meta: {
                    auth: false
                }
            },
            {
                path: "posts",
                name: "posts",
                component: Posts,
                meta: {
                    auth: true
                }
            },
            {
                path: "tags",
                name: "tags",
                component: Tags,
                meta: {
                    auth: true
                }
            }
        ]
    }
];

const router = new VueRouter({
    history: true,
    mode: "history",
    routes
});

Vue.router = router;

export default router;
