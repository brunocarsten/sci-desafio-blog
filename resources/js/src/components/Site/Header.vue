<template>
    <header>
        <v-container class="d-flex justify-space-between align-items-center">
            <div class="header-brand-search">
                <div>
                    <div class="logo">
                        <router-link :to="{ name: 'site' }">
                            <img src="/images/logo.png" alt="Logo" />
                        </router-link>
                    </div>
                    <div class="mobile-menu">
                        <v-icon size="32" color="#700b0d">fas fa-bars</v-icon>
                    </div>
                </div>
            </div>
            <div class="stripe d-flex justify-space-between align-items-center">
                <ul class="navbar-options">
                    <li v-for="(link, i) in links" :key="i">
                        <router-link v-if="link.name" :to="route">
                            {{ link.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </v-container>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            disabled: true,
            links: [
                {
                    name: "Painel"
                }
            ]
        };
    },

    computed: {
        route() {
            if (this.$auth.check() === true) return { path: "/painel/posts" };

            return { path: "/painel" };
        }
    }
};
</script>
