<template>
  <div class="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
    <!-- Map container -->
    <div ref="mapContainer" class="w-full h-full rounded-lg"></div>

    <!-- Search Bar -->
    <div ref="searchContainer" class="absolute top-4 left-4 z-10"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// Define refs
const mapContainer = ref<HTMLDivElement | null>(null);
const searchContainer = ref<HTMLDivElement | null>(null);
const map = ref<Map | null>(null);
const marker = ref<Marker | null>(null);
const geocoder = ref<MapboxGeocoder | null>(null);

const emit = defineEmits(["search-result"]);
// Initialize map on mount
const initMap = () => {
  if (!mapContainer.value) return;

  // Set Mapbox access token
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // Initialize the map
  map.value = new Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [4.469936, 50.503887], // Default Belgium coordinates
    zoom: 13,
  });

  // Initialize Geocoder Search
  geocoder.value = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken || "",
    mapboxgl: mapboxgl as any,
    marker: false, // Disable default marker to avoid duplicate markers
    placeholder: "Search for a location...",
  });

  // Handle search results
  geocoder.value.on("result", (event: { result: any }) => {
    const { center, place_name } = event.result;
    const result = { lat: center[1], lng: center[0], place_name };
    emit("search-result", result);

    new mapboxgl.Marker().setLngLat([center[0], center[1]]).addTo(map.value!);
  });

  // Append search box to container
  if (searchContainer.value) {
    searchContainer.value.appendChild(geocoder.value.onAdd(map.value as Map));
  }
};

// Watch for new ride markers
watch(
  () => marker.value,
  (newMarker) => {
    if (newMarker) {
      newMarker.addTo(map.value as Map);
    }
  }
);

onMounted(initMap);
// Handle search results and update the marker
// const handleSearchResult = (result: any) => {
//   console.log("Search result:", result);

//   const { center } = result;
//   if (!center || center.length !== 2) return;

//   if (marker.value) {
//     marker.value.remove();
//   }

//   // Create and add a new marker at the searched location
//   marker.value = new Marker({ color: "red" })
//     .setLngLat(center)
//     .addTo(map.value as Map);

//   map.value?.flyTo({
//     center: center,
//     zoom: 14,
//     essential: true,
//   });
// };

onUnmounted(() => {
  map.value?.remove();
  geocoder.value?.clear();
});
</script>

<style scoped></style>
