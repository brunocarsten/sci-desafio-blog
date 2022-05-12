<template>
    <transition name="fade" mode="out-in">
        <router-view />
    </transition>
</template>

<script>
export default {
    mounted() {
        // if (this.$auth.check()) this.$router.push({ name: "posts" });
    }
};
</script>
