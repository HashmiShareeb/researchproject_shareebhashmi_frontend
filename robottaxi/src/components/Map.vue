<template>
  <div class="my-3 rounded-xl min-h-[400px]" ref="mapElement"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type PropType, type Ref } from "vue";
import "mapbox-gl/dist/mapbox-gl.css"; // zeker niet vergeten
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Ensure map container exists
const mapElement = ref<HTMLElement | null>(null);

// Define props at the top (before onMounted)
const props = defineProps({
  markers: {
    type: Array as PropType<{ lat: number; lng: number; label: string }[]>,
    required: false,
  },
});

onMounted(() => {
  if (!mapElement.value) return;

  // Initialize the map
  const map = new mapboxgl.Map({
    container: mapElement.value,
    style: "mapbox://styles/mapbox/streets-v12", // Style URL
    center: [-74.5, 40], // Default starting position [lng, lat]
    zoom: 9, // Zoom level
  });

  // Function to display markers
  const showMarkers = (map: mapboxgl.Map) => {
    if (!props.markers || props.markers.length === 0) return;

    props.markers.forEach((marker) => {
      if (!marker.lat || !marker.lng) return;

      new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new mapboxgl.Popup().setHTML(marker.label))
        .addTo(map);
    });
  };

  map.on("load", () => {
    showMarkers(map);
  });
});
</script>
