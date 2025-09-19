<script setup>
import { ref } from 'vue'
import { News, Form, Map, FormResponse } from '../components'

// Variabile reattiva che contiene i dati della ricerca effettuata
// Inizialmente vuota: linea, partenza, arrivo e lista fermate
const datiRicerca = ref({
    linea: '',
    partenza: '',
    arrivo: '',
    fermate: []
})

const ricercaEffettuata = ref(false)

// Funzione che aggiorna i dati della ricerca e setta la variabile a true
// Viene chiamata con il payload dei dati della ricerca completata
function risultato(payload) {
    datiRicerca.value = payload     // Aggiorna i dati con quelli ricevuti
    ricercaEffettuata.value = true  // Segnala che la ricerca è stata effettuata
}
</script>

<template>
    <div>
        <News />
    </div>
    <div class="content-container">
        <Form @cerca="risultato" />
        <FormResponse v-if="ricercaEffettuata" :linea="datiRicerca.linea" :partenza="datiRicerca.partenza"
            :arrivo="datiRicerca.arrivo" :fermate="datiRicerca.fermate" @chiudi="ricercaEffettuata = false" />
        <Map v-else />
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