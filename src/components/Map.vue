<template>
<div class="map-container">
    <l-map
v-model:zoom="zoom"
:center="center"
    >
<l-tile-layer
        :url="url"
        :attribution="attribution"
/>
<l-marker :lat-lng="center"/>
    </l-map>
</div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

export default {
name: 'MapComponent',
components: {
    LMap,
    LTileLayer,
    LMarker
},
data() {
    return {
url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
zoom: 13,
center: [45.0703, 7.6869],
    }
},
mounted() {

    setTimeout(() => {
if (this.$refs.map) {
this.$refs.map.mapObject.invalidateSize()
}
    }, 100)
}
}
</script>

<style>
.map-container {
width: 100%;
height: 500px;
position: relative;
z-index: 0;
margin-top: 25px;
border-radius: 100px;
}

.leaflet-container {
width: 100%;
height: 100%;
}


</style>