<template>
  <div class="lines-container">
    <h1>Linee e Fermate</h1>

    <div v-if="lines.length">
      <div v-for="line in lines" :key="line.id" class="line-block">
        <h3 class="line-title">{{ line.name }}</h3>

        <table class="table table-bordered stops-table">
          <thead>
            <tr>
              <th style="width: 10%">#</th>
              <th>Nome Fermata</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stop, index) in line.stops" :key="stop.id">
              <td>{{ index + 1 }}</td>
              <td>{{ stop.name }}</td>
            </tr>
            <tr v-if="!line.stops.length">
              <td colspan="2" class="text-center text-muted">Nessuna fermata disponibile</td>
            </tr>
          </tbody>
        </table>
      </div>
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
          name: 'Linea 1',
          stops: [
            { id: 1, name: 'Fermata A' },
            { id: 2, name: 'Fermata B' }
          ]
        },
        {
          id: 2,
          name: 'Linea 2',
          stops: [
            { id: 3, name: 'Fermata C' },
            { id: 4, name: 'Fermata D' }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.lines-container {
  padding: 20px;
  background-color: #f9f9f9;
}

.line-block {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.line-title {
  margin-bottom: 16px;
  color: #333;
  font-weight: bold;
}

.stops-table {
  margin-bottom: 0;
}

.stops-table th,
.stops-table td {
  vertical-align: middle;
  text-align: left;
}
</style>
