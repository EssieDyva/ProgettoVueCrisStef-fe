<script setup>
import { ref } from 'vue'
import { News, Form, Map, FormResponse } from '../components'

const datiRicerca = ref({
    linea: '',
    partenza: '',
    arrivo: '',
    fermate: []
})

const ricercaEffettuata = ref(false)

function risultato(payload) {
    datiRicerca.value = payload
    ricercaEffettuata.value = true
}
</script>

<template>
    <div>
        <News />
    </div>
    <div class="content-container">
        <Form @cerca="risultato" />
        <FormResponse v-if="ricercaEffettuata" :linea="datiRicerca.linea" :partenza="datiRicerca.partenza"
            :arrivo="datiRicerca.arrivo" :fermate="datiRicerca.fermate" 
            @chiudi="ricercaEffettuata=false" />
        <Map v-else/>
    </div>
</template>

<style scoped>
.content-container {
    display: flex;
    gap: 20px;
    padding: 20px;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>