<script setup>
import { ref, onMounted } from 'vue';
import { getFermate, insertFermate, deleteFermate } from '../helpers/api' // <-- AGGIUNTA
import { Popup } from '../components';

const rawStops = ref([]);
const lines = ref([]);
const maxStops = ref(0);

// Funzione asincrona per caricare le fermate dall'API
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

const isInsertPopupVisible = ref(false);
const showInsertPopup = () => {
  isInsertPopupVisible.value = true;
};
const closeInsertPopup = () => {
  isInsertPopupVisible.value = false;
};

const isDeletePopupVisible = ref(false);
const showDeletePopup = () => {
  isDeletePopupVisible.value = true;
};
const closeDeletePopup = () => {
  isDeletePopupVisible.value = false;
};

// --- NUOVE FUNZIONI PER GESTIRE LE API ---
const handleAdd = async (payload) => {
    insertFermate(payload)
    .then((response) => {
        fetchStops();
    })
};

const handleDelete = async (idFermata) => {
    deleteFermate(idFermata)
    .then((response) => {
      fetchStops();
    })
};
// ------------------------------------------

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
    <div class="cerca-button" @click="showInsertPopup">AGGIUNGI FERMATA</div>
    <div class="cerca-button" @click="showDeletePopup">RIMUOVI FERMATA</div>
  </div>

  <div v-if="isInsertPopupVisible" class="modal-overlay">
    <Popup @chiudi="closeInsertPopup" mode="aggiungi" :onAction="handleAdd" />
  </div>
  <div v-if="isDeletePopupVisible" class="modal-overlay">
    <Popup @chiudi="closeDeletePopup" mode="cancella" :onAction="handleDelete" />
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
  background-color: #e3c412;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}


.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-out;
}


.modal-close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  color: #888;
  transition: color 0.2s;
}

.modal-close-button:hover {
  color: #333;
}


.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #250fe7;
}


.modal-button {
  width: 100%;
  background-color: #250fe7;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modal-button:hover {
  background-color: #1a08b3;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>