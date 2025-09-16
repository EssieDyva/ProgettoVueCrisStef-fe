<script>

</script>

<template>
    <div class="searchbar">
        <form action="/ricerca" method="get">
            <input type="text" name="query" placeholder="">
            &nbsp;
            &nbsp;
            <button type="submit "><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAABz0lEQVR4nL2VO0tDQRCFP4z4QFPYCEYsxNgYa0FsfFVaxM7OWlGUaPwB+lsEHyGCrZUawUoQo+DjL4hi0vggUQaPEC65m9wkemDh7t6ZPTNnZ2fBH1FgE9gHMhr2ndS/ujEIpIEi8OUzikCqHsI5IK/NroE1IAZ0aMS0lpVNDojXQlIA3oAloMlhGwKWgXf5xIPIlRfJRIDgJkWWq1bGtKRYJDhW5GtnVjGbos7EJZdLxhvtMeAyTCoiO2RDVw1kCe2x4TI6kNGQ5ttAc0CiYe2x5zLKyCis+akcgyCsPc6CEN0BWzUSnbuM9j3SHQMvQHcN0qWCFMOi5idAW8BiWHcZRVWaWZVqC3Alx4tKJcuPz606hF0VJ1La2NqKoRe41NoHsAPMAyNAj8d3VXaHFfNWVjm1kymtWYkvqGtc6BpYIO0lftMKxNpXP1UirvTf1VZMEj+ElMmHsnkCRpVxa7VkOTnf6JCtojo1hnXgt7J5BZ49b1W2jLy+MqYqPHwFSdkHjJf5f1ctGao26127utTnCiDhqcQxn2DugQgNRFvJi+sdD6rghqFHcv0LWcRBdtRIIkRmGXiJ7PI3HCbTYwnJJzD7F0S/ZCaXZTJjK9+BraY95q1LSgAAAABJRU5ErkJggg==" alt="search"></button>
        </form>
    </div>
</template>

<style>
form {
    display: flex; 
    justify-content: flex-end;
    border-radius: 40px;
    align-items: center;
    background: transparent;
    border: 3px solid #1800ad; 
    padding: 8px 15px;
    transition: all 0.3s ease;
    width: 400px;
    height: 40px;
}

.searchbar {
    display: flex; 
    float: right;
}

::placeholder {
    color: #f0e9e9; 
}

button {
    background-color: #d8d416; 
    border-radius: 50px; 
}

.search-icon {
    font-size: 20px; 
    color: #f0e9e9; 
    margin-right: 10px; 
}

input {
    background: transparent; 
    border: none; 
    outline: none; 
    color: #f0e9e9; 
    font-size: 16px; 
    width: 200px; 
    transition: width 0.3s ease; 
}
</style>