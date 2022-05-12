import bearer from "@websanova/vue-auth/drivers/auth/bearer";
import axios from "@websanova/vue-auth/drivers/http/axios.1.x";
import router from "@websanova/vue-auth/drivers/router/vue-router.2.x";

const config = {
    auth: bearer,
    http: axios,
    router: router,
    tokenDefaultName: "token",
    tokenStore: ["localStorage"],
    registerData: {
        url: "auth/register",
        method: "POST",
        redirect: "/painel"
    },
    loginData: {
        url: "auth/login",
        method: "POST",
        redirect: "/painel/posts",
        fetchUser: true
    },
    logoutData: {
        url: "auth/logout",
        method: "POST",
        redirect: "/painel",
        makeRequest: true
    },
    fetchData: { url: "auth/user", method: "GET", enabled: true },
    refreshData: {
        url: "auth/refresh",
        method: "GET",
        enabled: true,
        interval: 30,
        redirect: "/painel/posts"
    }
};

export default config;
