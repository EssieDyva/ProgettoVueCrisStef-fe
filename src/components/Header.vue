<script setup>
import { Navbar, Searchbar } from '.';
</script>

<template>
    <RouterLink to="/" class="header">
        <img src="../assets/CRISTE.png" alt="Header Image" class="header-image" />
        <Searchbar />
    </RouterLink>
    <div>
        <Navbar />
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

img {
    height: 70px;
    width: auto;
    margin: 20px
}
</style>