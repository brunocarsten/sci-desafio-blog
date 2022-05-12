<template>
    <v-snackbar dark v-model="snack.active" :color="snack.color">
        {{ snack.text }}
    </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters("Snack", ["snack"])
    }
};
</script>

<style></style>
