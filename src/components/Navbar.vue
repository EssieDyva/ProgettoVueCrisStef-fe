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
.nav-item {
  display: inline-block;
  font-size: 20px;
  height: 100%;
  padding: 15px;
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
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  display: block;
  text-align: center;
  font-family: "Archivo Black", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
