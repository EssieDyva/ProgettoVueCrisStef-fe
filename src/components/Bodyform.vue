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
            
        </div>
        
        <div class="fermata-group">
            <div class="input-group">
                
            </div>

            <div class="input-group">
                
            </div>
        </div>
        
        <div class="cerca-wrapper">

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
    width: 800px;  /* Aumentata la larghezza per allungarlo verso il centro */
    margin-top: 70px;
    box-sizing: border-box;
}

.main-container form {
    display: flex;
    flex-direction: column;
    gap: 45px;
    margin-top: 20px;
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
font-size: 16px;
font-weight: bold;
margin-bottom: 5px;
}

.linea-group input,
.input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;
}

.cerca-wrapper {
    margin-top: 25px;
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
}

</style>