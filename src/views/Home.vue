<script setup>
import { News, Body, Bodyform, Map } from '../components';
</script>

<template>
    <div>
        <News />
    </div>
    <div class="content-container">
        <Body />
        <Bodyform />
        <Map />
    </div>
</template>

<style scoped>
.content-container {
    display: flex;
    gap: 20px;
    padding: 20px;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>