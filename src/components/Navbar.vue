<script>
</script>
<template>
  <div class="navbar">
    <nav>
      <RouterLink to="/">
        <div class="nav-item">
          HOME
        </div>
      </RouterLink>
      <RouterLink to="/fermate">
        <div class="nav-item">
          FERMATE
        </div>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}

.nav-item {
  display: inline-block;
  font-size: 20px;
  padding: 7px;
}

.nav-item:visited {
  color: #1800ad;
}

.nav-item:hover {
  color: white;
  background-color: #1800ad;
  cursor: pointer;
}

.navbar {
  background: #e3e3e3;
  background: linear-gradient(0deg,
      rgba(227, 227, 227, 1) 0%,
      rgba(255, 255, 255, 1) 100%);
  color: #1800ad;
  width: 100%;
  display: block;
  text-align: center;
  font-family: "Archivo Black", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
