import { ref } from "vue";
import { defineStore } from "pinia";
import { getFermate, insertFermate, deleteFermate } from "../helpers/api";

const baseURL = 'http://localhost:8081/api/fermate';

export const useFermateStore = defineStore('fermate', () => {
    const linee = ref([]);
    const linea = ref();
    const fermate = ref([]);
    const nomeFermata = ref("");

    // Funzione asincrona per caricare tutte le linee disponibili
    const caricaLinee = async () => {
        try {
            const response = await getFermate()

            // Estrae i numeri di linea unici dalle fermate
            const lineeUniche = [...new Set(response.data.map(fermata => fermata.numeroLinea))]

            // Mappa i numeri di linea in oggetti e li ordina in modo crescente
            linee.value = lineeUniche.map(numeroLinea => ({
                id: numeroLinea,
                numero: numeroLinea
            })).sort((a, b) => a.numero - b.numero)

        } catch (error) {
            console.error('Errore nel caricamento delle linee:', error)
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

    function aggiungiFermata(event) {
        event.preventDefault(); // Previene il comportamento predefinito del form

        // Validazione semplice
        if (!linea.value || !nomeFermata.value.trim()) {
            alert("Seleziona una linea e inserisci un nome per la fermata.");
            return;
        }

        // Costruisci il payload da inviare all'API
        const payload = {
            numeroLinea: linea.value,
            nomeFermata: nomeFermata.value.trim(),
        };

        // Chiamata all'API per inserire la nuova fermata
        insertFermate(payload)
            .then((response) => {
                alert("Fermata aggiunta con successo!");
                // Resetta i campi del form
                linea.value = "";
                nomeFermata.value = "";
                location.reload(); // Ricarica la pagina per vedere la nuova fermata
            })
            .catch((error) => {
                console.error("Errore nell'aggiunta della fermata:", error);
                alert("Si è verificato un errore. Per favore riprova.");
            });
    }

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
    return { linea, linee, fermate, nomeFermata, caricaFermate, caricaLinee, aggiungiFermata, cancellaFermata }
})