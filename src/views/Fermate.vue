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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFermate } from '../helpers/api'

const rawStops = ref([]);
const lines = ref([]);
const maxStops = ref(0);

const fetchStops = async () => {
  try {
    const response = await getFermate();
    const data = response.data;
    rawStops.value = data;

    const grouped = {};
    data.forEach(stop => {
      const lineNumber = stop.numeroLinea;
      if (!grouped[lineNumber]) {
        grouped[lineNumber] = [];
      }
      grouped[lineNumber].push({
        id: stop.idFermata,
        name: stop.nomeFermata,
      });
    });

    lines.value = Object.entries(grouped).map(([lineNumber, stops]) => ({
      id: parseInt(lineNumber),
      name: `Linea ${lineNumber}`,
      stops,
    }));

    maxStops.value = Math.max(...lines.value.map(line => line.stops.length));
  } catch (error) {
    console.error('Errore durante il fetch delle fermate:', error);
  }
};

onMounted(fetchStops);
</script>

<style scoped>
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