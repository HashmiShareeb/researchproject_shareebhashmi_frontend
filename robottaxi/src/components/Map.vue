<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";

// Mapbox Token (Replace with your actual token)
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const mapContainer = ref<HTMLElement | null>(null);

const ride = ref({
  rideId: "8ac35a3b-9afe-447a-8703-882c8f98bcf1",
  rideName: "City Center to Airport",
  rideDescription: "Late night ride to the airport",
  ridePrice: 25.5,
  rideStatus: "REQUESTED",
  location: {
    latitude: 50.850346,
    longitude: 4.351721,
    address: "City Center",
  },
});

onMounted(() => {
  if (!mapContainer.value) return;

  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [48.418878483840466, 4.041876460310576], // Center on ride location
    zoom: 12,
  });

  // Add Marker for Ride Location
  new mapboxgl.Marker({ color: "red" })
    .setLngLat([ride.value.location.longitude, ride.value.location.latitude])
    .setPopup(
      new mapboxgl.Popup().setHTML(`
        <h3>${ride.value.rideName}</h3>
        <p>${ride.value.rideDescription}</p>
        <p><strong>Price:</strong> $${ride.value.ridePrice}</p>
        <p><strong>Location:</strong> ${ride.value.location.address}</p>
      `)
    )
    .addTo(map);
});
</script>

<style>
.map-container {
  width: 100%;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
