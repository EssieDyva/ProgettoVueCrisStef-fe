<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

export default {
    name: 'MapComponent',

    // Registrazione dei componenti usati nel template
    components: {
        LMap,
        LTileLayer,
        LMarker
    },

    // Stato reattivo del componente
    data() {
        return {
            // URL dei tile (mappa di sfondo) fornita da OpenStreetMap
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

            // Attribuzione obbligatoria per l'utilizzo delle mappe OSM
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

            zoom: 13,                 // Livello di zoom iniziale
            center: [45.0703, 7.6869] // Coordinate del centro mappa (Torino)
        }
    },

    // Hook eseguito quando il componente è montato nel DOM
    mounted() {
        // Timeout per correggere il rendering della mappa
        // a causa di possibili problemi di visualizzazione iniziale
        setTimeout(() => {
            if (this.$refs.map) {
                // Forza il ridimensionamento corretto della mappa
                this.$refs.map.mapObject.invalidateSize()
            }
        }, 100)
    }
}
</script>

<template>
    <div class="map-container">
        <l-map v-model:zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-marker :lat-lng="center" />
        </l-map>
    </div>
</template>

<style>
.map-container {
    width: 100%;
    height: 420px;
    position: relative;
    z-index: 0;
    margin-top: 25px;
    margin-right: 20px;
    border-radius: 100%;
}

.leaflet-container {
    width: 100%;
    height: 100%;
}
</style>