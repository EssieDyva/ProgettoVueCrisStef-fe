<script>

</script>

<template>
  <div class="news scroll-left">
    <p class="paragrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, totam harum! Nostrum
      sit id quaerat eos ex quo blanditiis deserunt, non et incidunt dolorum maxime illum necessitatibus quos magni.
      Voluptatum!</p>
  </div>
</template>

<style>
.news {
  margin-top: 5px;
  border: 3px solid #0f0fd2;
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.scroll-left {
  overflow: hidden;
  position: relative;
}

.scroll-left p {
  margin: 0;
  transform: translateX(100%);
  animation: scroll-left 45s linear infinite;
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
  line-height: 1;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Archivo Black", sans-serif;
}
</style>