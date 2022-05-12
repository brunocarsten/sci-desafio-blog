<template>
    <v-navigation-drawer permanent app>
        <v-row class="fill-height" no-gutters>
            <v-navigation-drawer
                dark
                mini-variant
                mini-variant-width="56"
                permanent
                color="primary"
            >
                <v-divider></v-divider>

                <v-list dense nav>
                    <v-list-item v-for="item in items" :key="item.title">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.title }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <template v-slot:append>
                    <div>
                        <v-list-item class="px-2">
                            <v-list-item-avatar>
                                <v-img src="images/logo.png"></v-img>
                            </v-list-item-avatar>
                        </v-list-item>
                    </div>
                </template>
            </v-navigation-drawer>

            <v-list class="grow">
                <v-list-item
                    v-for="(link, i) in links"
                    :key="i"
                    router
                    :to="link.route"
                >
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="link.name"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-row>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            items: [{ title: "Home", icon: "mdi-view-dashboard" }],
            links: [
                {
                    name: "Posts",
                    route: { name: "posts" }
                },
                {
                    name: "Tags",
                    route: { name: "tags" }
                }
            ],
            mini: true
        };
    }
};
</script>
