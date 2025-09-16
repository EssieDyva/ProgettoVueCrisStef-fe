<script>

</script>

<template>
    <div class="searchbar">
        <form action="/ricerca" method="get">
            <input type="text" name="query" placeholder="">
            &nbsp;
            &nbsp;
            <button type="submit ">Cerca</button>
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
    background-color: #211295;
    border-radius: 50px;
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