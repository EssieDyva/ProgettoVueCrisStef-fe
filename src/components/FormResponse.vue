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

    const from = Math.min(startIndex, endIndex)
    const to = Math.max(startIndex, endIndex)

    return props.fermate.slice(from, to + 1)
})
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 8px 12px;
    border: 1px solid #ccc;
}
</style>
