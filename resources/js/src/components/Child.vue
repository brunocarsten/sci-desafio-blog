<template>
    <transition name="fade" mode="out-in">
        <router-view />
    </transition>
</template>

<script>
export default {
    name: "Child"
};
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
