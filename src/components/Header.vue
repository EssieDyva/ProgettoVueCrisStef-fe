<script setup>
import { Navbar, Searchbar } from '.';
</script>

<template>
    <div class="header">
        <RouterLink to="/">
            <img src="../assets/CRISTE.png" alt="Header Image" class="header-image" />
        </RouterLink>
        <Searchbar />
    </div>
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