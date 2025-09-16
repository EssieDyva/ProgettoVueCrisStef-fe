<script setup>
import { Navbar, Searchbar, News } from '.';
</script>

<template>
    <div class="header">
        <img src="../assets/CRISTE.png" alt="Header Image" class="header-image" />
        <Searchbar />
    </div>
    <div>
        <Navbar />
    </div>
    <div>
        <News />
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
    height: 80px;
    width: auto;
    margin: 20px
}
</style>