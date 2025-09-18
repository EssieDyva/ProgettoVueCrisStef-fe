<template>
    <div class="risultato">
        <h2>Fermate da "{{ partenza }}" a "{{ arrivo }}" sulla Linea {{ linea }}</h2>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome Fermata</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(fermata, index) in fermateIntermedie" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ fermata }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    linea: String,
    partenza: String,
    arrivo: String,
    fermate: Array
})

const fermateIntermedie = computed(() => {
    const startIndex = props.fermate.indexOf(props.partenza)
    const endIndex = props.fermate.indexOf(props.arrivo)
    if (startIndex === -1 || endIndex === -1) return []

    if (startIndex <= endIndex) return props.fermate.slice(startIndex, endIndex + 1)

    else return props.fermate.slice(endIndex, startIndex + 1).reverse()
})
</script>

<style scoped>
.risultato {
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    background-color: #2512d5;
    border: 1px solid #2512d5;
    border-radius: 8px;
    padding: 24px;
    max-width: 600px;
    margin: 20px auto;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-weight: bold;
}

.risultato h2 {
    color: #ffda44;
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
}

.risultato table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: transparent;
    border: 1px solid #2512d5;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.risultato thead th {
    background-color: #ffda44;
    color: #2512d5;
    font-weight: 600;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid #2512d5;
    border-right: 1px solid #2512d5;
    font-size: large;
}

.risultato tbody tr {
    color: #2512d5;
    transition: background-color 0.3s ease;
}

.risultato tbody tr:nth-child(even) {
    background-color: rgba(37, 18, 213, 0.06);
}

.risultato tbody tr:hover {
    background-color: rgba(37, 18, 213, 0.12);
}

.risultato tbody td {
    padding: 12px;
    border-bottom: 1px solid #2512d5;
    border-right: 1px solid #2512d5;
    background-color: #f9f9f9;
    font-size: large;
}

.risultato tbody td:last-child,
.risultato thead th:last-child {
    border-right: none;
}

.risultato tbody td:first-child {
    font-weight: 500;
    width: 40px;
    text-align: left;
}
</style>
