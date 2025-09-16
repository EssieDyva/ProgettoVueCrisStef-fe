<script setup>
import { ref } from 'vue';

const newsText = ref('');
newsText.value = 'Benvenuti nel nostro sito!';
</script>

<template>
  <div class="news scroll-left">
    <p class="paragrafo">{{ newsText.toUpperCase() }}</p>
  </div>
</template>

<style>
.news {
  margin-top: 5px;
  border: 3px solid #0f0fd2;
  height: 40px;
  width: 100%;
  overflow: hidden;
}

.scroll-left {
  overflow: hidden;
  position: relative;
}

.scroll-left p {
  margin: 0;
  transform: translateX(100%);
  animation: scroll-left 25s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.paragrafo {
  color: #0f0fd2;
  font-size: 33px;
  font-weight: bold;
  line-height: 40px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Archivo Black", sans-serif;
}
</style>