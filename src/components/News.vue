<script>

</script>

<template>
    <div class="news">
        <form action="/ricerca" method="get">
            <input type="text" name="query" placeholder="">
        </form>
    </div>
</template>

<style>
.news {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 50%;
}

.text {
    color: #0f0fd2;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
}
</style>