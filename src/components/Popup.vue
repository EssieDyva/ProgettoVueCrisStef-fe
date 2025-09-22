<script setup>
import { ref, onMounted, watch } from "vue";
import { getFermate } from "../helpers/api";

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
const linee = ref([]);
const linea = ref();
const nomeFermata = ref("");
const fermate = ref([]);

const caricaLinee = async () => {
    try {
        const response = await getFermate();
        const lineeUniche = [
            ...new Set(response.data.map((fermata) => fermata.numeroLinea)),
        ];
        linee.value = lineeUniche
            .map((numeroLinea) => ({
                id: numeroLinea,
                numero: numeroLinea,
            }))
            .sort((a, b) => a.numero - b.numero);
    } catch (error) {
        console.error("Errore nel caricamento delle linee:", error);
    }
};

const caricaFermate = async (numeroLinea) => {
    try {
        const response = await getFermate();
        const fermateLinea = response.data.filter(
            (fermata) => fermata.numeroLinea == numeroLinea
        );
        fermate.value = fermateLinea.map((fermata) => ({
            id: fermata.idFermata,
            nome: fermata.nomeFermata,
        }));
    } catch (error) {
        console.error("Errore nel caricamento delle fermate:", error);
        fermate.value = [];
    }
};

watch(linea, (nuovaLinea) => {
    nomeFermata.value = "";
    if (nuovaLinea) {
        caricaFermate(nuovaLinea);
    } else {
        fermate.value = [];
    }
});

function handleAction(event) {
    event.preventDefault();

    // Validazione per la modalità 'cancella' (nomeFermata è un numero)
    if (props.mode === 'cancella' && !nomeFermata.value) {
        alert("Seleziona una fermata da cancellare.");
        return;
    }
    
    // Validazione per la modalità 'aggiungi' (nomeFermata è una stringa)
    if (props.mode === 'aggiungi' && !nomeFermata.value.trim()) {
        alert("Seleziona una linea e inserisci un nome per la fermata.");
        return;
    }

    // Costruisci il payload in base alla modalità
    const payload =
        props.mode === "aggiungi"
            ? { numeroLinea: linea.value, nomeFermata: nomeFermata.value.trim() }
            : parseInt(nomeFermata.value);

    // Usa la prop `onAction` per chiamare la funzione del componente padre
    props
        .onAction(payload)
        .then(() => {
            alert(`Fermata ${props.mode === 'aggiungi' ? 'aggiunta' : 'cancellata'} con successo!`);
            // Resetta i campi
            linea.value = "";
            nomeFermata.value = "";
            // location.reload(); // Evita il ricaricamento, meglio gestire lo stato
            emit('chiudi'); // Chiudi il popup dopo il successo
        })
        .catch((error) => {
            console.error(`Errore durante l'operazione di ${props.mode}:`, error);
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
                <select v-if="props.mode === 'cancella'" class="text" v-model="nomeFermata" :disabled="!linea">
                    <option value="">
                        {{ linea ? 'Seleziona fermata da cancellare' : 'Scegliere una linea' }}
                    </option>
                    <option v-for="fermata in fermate" :key="fermata.id" :value="fermata.id">
                        {{ fermata.nome }}
                    </option>
                </select>
                <input v-else type="text" class="text-input" placeholder="Inserisci il nome della nuova fermata"
                    v-model="nomeFermata" :disabled="!linea" />
            </div>
        </div>
        <button class="submit-button" type="submit" @click="handleAction" :class="{ disabled: !linea || !nomeFermata }">
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