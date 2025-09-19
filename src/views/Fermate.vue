<script setup>
import { ref, onMounted } from 'vue';
import { getFermate } from '../helpers/api'

const rawStops = ref([]);
const lines = ref([]);
const maxStops = ref(0);

// Funzione asincrona per caricare le fermate dall'API
const fetchStops = async () => {
  try {
    // Chiamata all'API per ottenere i dati delle fermate
    const response = await getFermate();
    const data = response.data;

    // Salviamo i dati raw in una variabile reattiva
    rawStops.value = data;

    // Oggetto temporaneo per raggruppare le fermate per numero di linea
    const grouped = {};

    // Cicliamo tutte le fermate per raggrupparle in base al numero della linea
    data.forEach(stop => {
      const lineNumber = stop.numeroLinea;

      // Se la linea non esiste ancora, inizializziamo l'array
      if (!grouped[lineNumber]) {
        grouped[lineNumber] = [];
      }

      // Aggiungiamo la fermata all'array della linea corrispondente
      grouped[lineNumber].push({
        id: stop.idFermata,
        name: stop.nomeFermata,
      });
    });

    // Convertiamo l'oggetto raggruppato in un array di linee con id, nome e fermate
    lines.value = Object.entries(grouped).map(([lineNumber, stops]) => ({
      id: parseInt(lineNumber),
      name: `Linea ${lineNumber}`,
      stops,
    }));

    // Calcoliamo il numero massimo di fermate tra tutte le linee per eventuali usi futuri
    maxStops.value = Math.max(...lines.value.map(line => line.stops.length));
  } catch (error) {
    console.error('Errore durante il fetch delle fermate:', error);
  }
};

// Esecuzione della funzione fetchStops al montaggio del componente
onMounted(fetchStops);


</script>

<template>
  <div class="lines-container">
    <div v-if="lines.length">
      <table class="lines-table">
        <thead>
          <tr>
            <th>#</th>
            <th v-for="line in lines" :key="line.id">{{ line.name.toUpperCase() }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowIndex in maxStops" :key="rowIndex">
            <td class="rowindex">{{ rowIndex }}</td>
            <td v-for="line in lines" :key="line.id" class="lines-row">
              {{ line.stops[rowIndex - 1]?.name.toUpperCase() || '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-muted">Nessuna linea disponibile.</p>
    </div>
    <div class="cerca-button" @click="handleCerca">
                    AGGIUNGI LINEA</div>
  </div>
</template>

<style scoped>

.cerca-button {
    background-color: #ffda44;
    color: #250fe7;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    margin-top: 20px;
    transition: background-color 0.3s, color 0.3s;
}

.cerca-button:hover {
  background-color: #e3c412;
}

.cerca-button:active {
  background-color: #004085; 
  transform: translateY(1px); 
}
.lines-container {
  padding: 20px;
  background-color: #f9f9f9;
  overflow-x: auto;
}

.lines-table {
  width: 100%;
  border-collapse: collapse;
}

.lines-table th,
.lines-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
  vertical-align: middle;
}

.lines-table th {
  background-color: #2512d5;
  color: #ffda44;
}

.lines-table td {
  font-weight: 100;
}

.lines-row {
  width: 15%;
}

.text-muted {
  color: #888;
}

.rowindex {
  width: 1%;
}
</style>