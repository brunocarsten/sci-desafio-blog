<template>
    <v-container>
        <transition name="page" mode="out-in">
            <slot>
                <router-view />
            </slot>
        </transition>
    </v-container>
</template>

<script>
export default {
    name: "Child"
};
</script>
