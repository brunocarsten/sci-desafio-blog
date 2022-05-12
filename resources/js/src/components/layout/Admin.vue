<template>
    <v-app>
        <Navbar />
        <v-main>
            <Child />
        </v-main>
    </v-app>
</template>

<script>
import Child from "../Child.vue";
import Navbar from "../base/Navbar.vue";

export default {
    name: "MainLayout",

    components: { Child, Navbar }
};
</script>
