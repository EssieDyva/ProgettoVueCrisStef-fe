<script>
export default {
    data() {
        return {
            linea: '',
            partenza: '',
            arrivo: ''
        }
    },
    methods: {
        handleCerca() {
            
            this.$emit('cerca', {
                linea: this.linea,
                partenza: this.partenza,
                arrivo: this.arrivo
            });
        }
    }
};
</script>

<template>
<div class="main-container">
    <div class="search-content">
        <div class="linea-group">
            <h3 class="input-title">LINEA</h3>
            <input class="text" v-model="linea" placeholder="Inserisci il numero di linea">
        </div>
        
        <div class="fermata-group">
            <div class="input-group">
                <h3 class="input-title">FERMATA DI PARTENZA</h3>
                <input class="text" v-model="partenza" placeholder="Inserisci la fermata di partenza">
            </div>

            <div class="input-group">
                <h3 class="input-title">FERMATA DI ARRIVO</h3>
                <input class="text" v-model="arrivo" placeholder="Inserisci la fermata di arrivo">
            </div>
        </div>
        
        <div class="cerca-wrapper">
            <div class="cerca-button" @click="handleCerca">CERCA</div>
        </div>
    </div>
</div>
</template>

<style>

.main-container {
    background-color: #2512d5;
    border: 3px solid #260fd2;
    border-radius: 10px;
    padding: 4rem;
    width: 450px;
    margin-top: 20px;
    margin-left: 40px;
    box-sizing: border-box;
}

.main-container form {
    display: flex;
    flex-direction: column;
    gap: 45px;
    margin-top: 10px;
    position: relative;
    background: transparent;
}

.linea-group, .fermata-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.input-title {
color: #d8d416; 
font-size: 15px;
font-weight: bold;
margin-bottom: 10px;
}

.linea-group input,
.input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d8d416;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;
}

.cerca-wrapper {
    margin-top: 5px;
    width: 100%;
}

.cerca-button {
    background-color: #d8d416;
    color: #0f0fe6;
    font-size: 18px;
    font-weight: bold;
    padding: 12px 20px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
}

.search-content {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.text {
    background: transparent;
    border: none;
    outline: none;
    color:  #ffffff;
    font-style:normal;
    font-size: 30px;
    font-weight: bold;
    width: 100%;
    transition: width 0.3s ease;
}


</style>