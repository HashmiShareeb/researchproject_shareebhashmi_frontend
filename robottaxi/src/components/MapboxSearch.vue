<!-- filepath: /c:/dev/researchproject_shareebhashmi_frontend/robottaxi/src/components/MapWithGeocoder.vue -->
<template>
  <div ref="mapContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const mapContainer = ref(null);

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: mapContainer.value as any as HTMLElement,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [-79.4512, 43.6568],
    zoom: 13,
  });

  // Add the control to the map.
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    })
  );
});
</script>
