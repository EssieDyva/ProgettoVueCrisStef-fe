<script setup>
import { onMounted, watch } from "vue";
import { useFermateStore } from "../stores/fermate.store";

// Definisce le props che il componente riceverà 
const props = defineProps({
    mode: {
        type: String,
        required: true,
        validator: (value) => ["aggiungi", "cancella"].includes(value),
    },
    onAction: {
        type: Function,
        required: true,
    },
});

const emit = defineEmits(["chiudi"]);
const fermateStore = useFermateStore();

watch(() => fermateStore.linea, (nuovaLinea) => {
    fermateStore.nomeFermata = "";

    if (nuovaLinea) {
        fermateStore.caricaFermate(nuovaLinea);
    } else {
        fermateStore.fermate = [];
    }
});

function handleAction(event) {
    event.preventDefault();

    // Validazione per la modalità 'cancella' (nomeFermata è un numero)
    if (props.mode === 'cancella' && !fermateStore.nomeFermata) {
        alert("Seleziona una fermata da cancellare.");
        return;
    }

    // Validazione per la modalità 'aggiungi' (nomeFermata è una stringa)
    if (props.mode === 'aggiungi' && !fermateStore.nomeFermata.trim()) {
        alert("Seleziona una linea e inserisci un nome per la fermata.");
        return;
    }

    // Costruisci il payload in base alla modalità 
    const payload =
        props.mode === "aggiungi"
            ? { numeroLinea: fermateStore.linea, nomeFermata: fermateStore.nomeFermata.trim() }
            : parseInt(fermateStore.nomeFermata);

    // Usa la prop `onAction` per chiamare la funzione del componente padre
    props
        .onAction(payload)
        .then(() => {
            alert(`Fermata ${props.mode === 'aggiungi' ? 'aggiunta' : 'cancellata'} con successo!`);
            // Resetta i campi
            fermateStore.linea = "";
            fermateStore.nomeFermata = "";
            // location.reload(); // Evita il ricaricamento, meglio gestire lo stato
            emit('chiudi'); // Chiudi il popup dopo il successo
        })
        .catch((error) => {
            console.error(`Errore durante l'operazione di ${props.mode}:`, error);
            alert("Si è verificato un errore. Per favore riprova.");
        });
}

onMounted(() => {
    fermateStore.caricaLinee();
});
</script>

<template>
    <div class="popup">
        <div class="select-group">
            <h3>NUMERO DI LINEA</h3>
            <select class="select" v-model="fermateStore.linea">
                <option value="">Seleziona una linea</option>
                <option v-for="lineaOption in fermateStore.linee" :key="lineaOption.id" :value="lineaOption.numero">
                    {{ lineaOption.numero }}
                </option>
            </select>
        </div>
        <div>
            <div>
                <h3 class="input-title">NOME FERMATA</h3>
                <select v-if="props.mode === 'cancella'" class="text" v-model="fermateStore.nomeFermata" :disabled="!fermateStore.linea">
                    <option value="">
                        {{ fermateStore.linea ? 'Seleziona fermata da cancellare' : 'Scegliere una linea' }}
                    </option>
                    <option v-for="fermata in fermateStore.fermate" :key="fermata.id" :value="fermata.id">
                        {{ fermata.nome }}
                    </option>
                </select>
                <input v-else type="text" class="text-input" placeholder="Inserisci il nome della nuova fermata"
                    v-model="fermateStore.nomeFermata" :disabled="!fermateStore.linea" />
            </div>
        </div>
        <button class="submit-button" type="submit" @click="handleAction" :class="{ disabled: !fermateStore.linea || !fermateStore.nomeFermata }">
            {{ props.mode === 'aggiungi' ? 'Aggiungi Fermata' : 'Cancella fermata' }}
        </button>
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

.select,
.text {
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
    color: #2512d5;
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