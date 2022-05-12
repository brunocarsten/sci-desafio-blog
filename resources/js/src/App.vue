<template>
    <transition>
        <component v-if="routes" :is="'Site'"></component>
        <component v-else :is="$auth.check() ? 'Admin' : 'Auth'"></component>
    </transition>
</template>

<script>
export default {
    components: {
        Admin: () => import("./components/layout/Admin"),
        Auth: () => import("./components/layout/Auth"),
        Site: () => import("./components/layout/Site.vue")
    },

    computed: {
        routes() {
            switch (this.$route.name) {
                case "site":
                    return true;
                    break;
                case "post":
                    return true;
                    break;
            }
        }
    }
};
</script>
