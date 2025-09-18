<script setup>
import { ref, watch, onMounted } from 'vue'
import { getFermate } from '../helpers/api'

const emit = defineEmits(['cerca'])

const linea = ref('')
const partenza = ref('')
const arrivo = ref('')
const linee = ref([])
const fermate = ref([])

const caricaLinee = async () => {
    try {
        const response = await getFermate()
        
        const lineeUniche = [...new Set(response.data.map(fermata => fermata.numeroLinea))]
        linee.value = lineeUniche.map(numeroLinea => ({
            id: numeroLinea,
            numero: numeroLinea
        })).sort((a, b) => a.numero - b.numero)
        
    } catch (error) {
        console.error('Errore nel caricamento delle linee:', error)
    }
}

const caricaFermate = async (numeroLinea) => {
    try {
        const response = await getFermate()
        
        const fermateLinea = response.data.filter(fermata => fermata.numeroLinea == numeroLinea)
        
        fermate.value = fermateLinea.map(fermata => ({
            id: fermata.idFermata,
            nome: fermata.nomeFermata
        }))
        
    } catch (error) {
        console.error('Errore nel caricamento delle fermate:', error)
        fermate.value = []
    }
}

watch(linea, (nuovaLinea) => {
    partenza.value = ''
    arrivo.value = ''
    
    if (nuovaLinea) {
        caricaFermate(nuovaLinea)
    } else {
        fermate.value = []
    }
})

const handleCerca = () => {
    emit('cerca', {
        linea: linea.value,
        partenza: partenza.value,
        arrivo: arrivo.value,
        fermate: fermate.value.map(f => f.nome)
    })
}

// Carica le linee al mount del componente
onMounted(() => {
    caricaLinee()
})
</script>

<template>
<div class="main-container">
    <div class="search-content">
        <div class="linea-group">
            <h3 class="input-title">LINEA</h3>
            <select class="text" v-model="linea">
                <option value="">Seleziona una linea</option>
                <option 
                    v-for="lineaOption in linee" 
                    :key="lineaOption.id" 
                    :value="lineaOption.numero"
                >
                    Linea {{ lineaOption.numero }}
                </option>
            </select>
        </div>
        
        <div class="fermata-group">
            <div class="input-group">
                <h3 class="input-title">FERMATA DI PARTENZA</h3>
                <select class="text" v-model="partenza" :disabled="!linea">
                    <option value="">
                        {{ linea ? 'Seleziona fermata di partenza' : 'Scegliere una linea' }}
                    </option>
                    <option 
                        v-for="fermata in fermate" 
                        :key="fermata.id" 
                        :value="fermata.nome"
                    >
                        {{ fermata.nome }}
                    </option>
                </select>
            </div>

            <div class="input-group">
                <h3 class="input-title">FERMATA DI ARRIVO</h3>
                <select class="text" v-model="arrivo" :disabled="!linea">
                    <option value="">
                        {{ linea ? 'Seleziona fermata di arrivo' : 'Scegliere una linea' }}
                    </option>
                    <option 
                        v-for="fermata in fermate" 
                        :key="fermata.id" 
                        :value="fermata.nome"
                    >
                        {{ fermata.nome }}
                    </option>
                </select>
            </div>
        </div>
        
        <div class="cerca-wrapper">
            <div class="cerca-button" @click="handleCerca" :class="{ disabled: !linea || !partenza || !arrivo}">CERCA</div>
        </div>
    </div>
</div>
</template>

<style>
.main-container {
    background-color: #2512d5;
    border: 3px solid #260fd2;
    border-radius: 10px;
    padding: 1rem;
    width: 90%;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 40px;
    box-sizing: border-box;
}

.main-container form {
    display: flex;
    flex-direction: column;
    gap: 45px;
    margin-top: 10px;
    position: relative;
    background: transparent;
}

.linea-group, .fermata-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.input-title {
color: #ffda44; 
font-size: 15px;
font-weight: bold;
margin-bottom: 10px;
}

.linea-group input,
.input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ffda44;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;
    background-color: white;
}

.linea-group input::placeholder,
.input-group input::placeholder {
    color: #2512d5;
    opacity: 50%;
}

.cerca-wrapper {
    margin-top: 5px;
    width: 100%;
}

.cerca-button {
    background-color: #ffda44;
    color: #2512d5;
    font-size: 18px;
    font-weight: bold;
    padding: 12px 20px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
}

.cerca-button.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.search-content {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.text {
    border-radius: 10px;
    color:  #2512d5;
    font-size: 30px;
    font-weight: bold;
    width: 100%;
    transition: width 0.3s ease;
}
</style>