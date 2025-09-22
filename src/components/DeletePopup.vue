<script setup>
import { ref, onMounted, watch } from "vue";
import { getFermate, deleteFermate } from "../helpers/api";

const emit = defineEmits(["chiudi"]);
const linee = ref([]);
const linea = ref();
const nomeFermata = ref("");
const fermate = ref([]);

const caricaLinee = async () => {
    try {
        const response = await getFermate();

        // Estrae i numeri di linea unici dalle fermate
        const lineeUniche = [
            ...new Set(response.data.map((fermata) => fermata.numeroLinea)),
        ];

        // Mappa i numeri di linea in oggetti e li ordina in modo crescente
        linee.value = lineeUniche
            .map((numeroLinea) => ({
                id: numeroLinea,
                numero: numeroLinea,
            }))
            .sort((a, b) => a.numero - b.numero);
    } catch (error) {
        console.error("Errore nel caricamento delle linee:", error);
    }
}

// Funzione asincrona per caricare le fermate relative a una specifica linea
const caricaFermate = async (numeroLinea) => {
    try {
        const response = await getFermate()

        // Filtra le fermate appartenenti alla linea selezionata
        const fermateLinea = response.data.filter(fermata => fermata.numeroLinea == numeroLinea)

        // Mappa le fermate ottenute in oggetti con id e nome
        fermate.value = fermateLinea.map(fermata => ({
            id: fermata.idFermata,
            nome: fermata.nomeFermata
        }))

    } catch (error) {
        console.error('Errore nel caricamento delle fermate:', error)
        fermate.value = []
    }
}

// Watcher che osserva il cambiamento del valore di `linea`
watch(linea, (nuovaLinea) => {
    nomeFermata.value = ''

    if (nuovaLinea) {
        // Carica fermate relative alla nuova linea selezionata
        caricaFermate(nuovaLinea)
    } else {
        // Se nessuna linea è selezionata, svuota le fermate
        fermate.value = []
    }
})

function cancellaFermata(event) {
        event.preventDefault();

        // Validazione semplice
        if (!linea.value || !nomeFermata.value) {
            alert("Seleziona una linea e inserisci la fermata da cancellare.");
            return;
        }

        // Chiamata all'API per cancellare la fermata
        deleteFermate(parseInt(nomeFermata.value))
            .then((response) => {
                alert("Fermata cancellata con successo!");
                // Resetta i campi del form
                linea.value = "";
                nomeFermata.value = "";
                location.reload();
            })
            .catch((error) => {
            console.error("Errore nella cancellazione della fermata:", error);
            alert("Si è verificato un errore. Per favore riprova.");
        });
    }

onMounted(() => {
    caricaLinee();
});
</script>

<template>
    <div class="popup">
        <div class="select-group">
            <h3>NUMERO DI LINEA</h3>
            <select class="select" v-model="linea">
                <option value="">Seleziona una linea</option>
                <option v-for="lineaOption in linee" :key="lineaOption.id" :value="lineaOption.numero">
                    {{ lineaOption.numero }}
                </option>
            </select>
        </div>
        <div>
            <div>
                <h3 class="input-title">NOME FERMATA</h3>
                    <select class="text" v-model="nomeFermata" :disabled="!linea">
                        <option value="">
                            {{ linea ? 'Seleziona fermata di partenza' : 'Scegliere una linea' }}
                        </option>
                        <option v-for="fermata in fermate" :key="fermata.id" :value="fermata.id">
                            {{ fermata.nome }}
                        </option>
                    </select>
            </div>
        </div>
        <button class="submit-button" type="submit" @click="cancellaFermata" :class="{ disabled: !linea || !nomeFermata }">Cancella fermata</button>
        <button class="modal-button" @click="$emit('chiudi')">Chiudi</button>
    </div>
</template>

<style scoped>
.popup {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    max-width: 550px;
    width: 60%;
    max-height: 80vh;
}

h3 {
    margin-bottom: 20px;
    color: #2512d5;
    font-size: 1.5em;
}

.select {
    color: #2512d5;
    width: 100%;
    padding: 10px;
    border: 2px solid #2512d5;
    border-radius: 5px;
    font-size: 1em;
    margin-bottom: 20px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
    text-transform: uppercase;
}

.text-input {
    width: 100%;
    padding: 10px;
    border: 2px solid #2512d5;
    border-radius: 5px;
    font-size: 1em;
    margin-bottom: 20px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
    text-transform: uppercase;
}

.text-input::placeholder {
    color: #aaa;
}

.modal-button,
.submit-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;
}

.modal-button {
    color:#2512d5;
}

.submit-button.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
}

button[type="submit"] {
    background-color: #2512d5;
    margin-right: 50%;
    margin-top: 20px;
}

button[type="submit"]:hover {
    background-color: #3f19d8;
}
</style>
