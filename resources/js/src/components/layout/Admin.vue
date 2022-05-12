<template>
    <v-app>
        <Navbar />
        <v-main>
            <Child />
            <Snackbar />
        </v-main>
    </v-app>
</template>

<script>
import Child from "../Child.vue";
import Navbar from "../base/Navbar.vue";
import Snackbar from "../base/Snackbar.vue";

export default {
    name: "MainLayout",

    components: { Child, Navbar, Snackbar }
};
</script>
