<template>
  <div class="lines-container">
    <div v-if="lines.length">
      <table class="lines-table">
        <thead>
          <tr>
            <th style="width: 5%">#</th>
            <th v-for="line in lines" :key="line.id">{{ line.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowIndex in maxStops" :key="rowIndex">
            <td>{{ rowIndex }}</td>
            <td v-for="line in lines" :key="line.id">
              {{ line.stops[rowIndex - 1]?.name || '' }}
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

<script>
export default {
  data() {
    return {
      lines: [
        {
          id: 1,
          name: 'Linea 9',
          stops: [
            { id: 1, name: 'STAMPALIA CAP.' },
            { id: 2, name: 'CALTANISSETTA' },
            { id: 3, name: 'BROSSO'},
            { id: 4, name: 'LARGO GROSSETO NORD'},
            { id: 5, name: 'MADONNA DI CAMPAGNA'}
          ]
        },
        {
          id: 2,
          name: 'Linea 60',
          stops: [
            { id: 6, name: 'PARIS CAP.' },
            { id: 7, name: 'DESTEFANIS' },
            { id: 8, name: 'BRAMAFAME'},
            { id: 9, name: 'STAMPALIA'},
            { id: 10, name: 'CALTANISSETTA'}
          ]
        },
        {
          id: 3,
          name: 'Linea 11',
          stops: [
            { id: 11, name: 'DE GASPERI CAP.' },
            { id: 12, name: 'SAN GIUSEPPE' },
            { id: 13, name: 'IV NOVEMBRE CAP.'},
            { id: 14, name: 'FILZI'},
            { id: 15, name: 'STAZIONE VENARIA'}
          ]
        }
      ]
    };
  },
  computed: {
    maxStops() {
      return Math.max(...this.lines.map(line => line.stops.length));
    }
  }
};
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

.text-muted {
  color: #888;
}
</style>