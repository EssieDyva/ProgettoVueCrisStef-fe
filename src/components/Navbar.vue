<script>
</script>
<template>
  <div class="navbar">
    <nav>
        <div class="nav-item">
          <RouterLink to="/">HOME</RouterLink>
        </div>  
        <div class="nav-item">
          <RouterLink to="/fermate">FERMATE</RouterLink>
        </div>
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

.nav-item:hover {
  color: white;
  background-color: #1800ad;
  cursor: pointer;
}

.navbar {
  background: #e3e3e3;
  background: linear-gradient(
    0deg,
    rgba(227, 227, 227, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  color: #1800ad;
  width: 100%;
  display: block;
  text-align: center;
  font-family: "Archivo Black", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
