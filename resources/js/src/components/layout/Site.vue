<template>
    <v-app>
        <v-main>
            <Header />
            <v-container>
                <Child />
            </v-container>
            <Footer />
        </v-main>
    </v-app>
</template>

<script>
import Child from "../Child";
import Header from "../Site/Header.vue";
import Footer from "../Site/Footer.vue";
export default {
    name: "BasicLayout",
    components: { Child, Header, Footer }
};
</script>

<style lang="scss">
@import "@/site/";
</style>
