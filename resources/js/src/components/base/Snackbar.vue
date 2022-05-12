<template>
    <v-snackbar v-model="value">
        {{ text }}
    </v-snackbar>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean
        },
        text: {
            type: String
        }
    }
};
</script>

<style></style>
