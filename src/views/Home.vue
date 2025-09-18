<script setup>
import { News, Form, Map } from '../components';
</script>

<template>
    <div>
        <News />
    </div>
    <div class="content-container">
        <Form />
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