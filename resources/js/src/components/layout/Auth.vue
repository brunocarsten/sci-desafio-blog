<template>
    <v-app class="auth">
        <v-main>
            <v-container fill-height>
                <Child />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Child from "../Child";

export default {
    name: "BasicLayout",
    components: { Child }
};
</script>

<style lang="scss" scoped>
@import "@/auth/";
</style>
