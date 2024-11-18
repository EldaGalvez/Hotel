<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const apiUrl = 'http://localhost:8080/api/habitaciones';  // URL de la API para obtener habitaciones
const habitaciones = ref([]);  // Lista vacía de habitaciones

// Computados para obtener la cantidad de habitaciones ocupadas y libres
const camasOcupadas = computed(() => {
    return habitaciones.value.filter(habitacion => habitacion.estado === 'ocupada').length;
});

const camasLibres = computed(() => {
    return habitaciones.value.filter(habitacion => habitacion.estado === 'libre').length;
});

// Función para obtener las habitaciones desde la API
const fetchHabitaciones = async () => {
  try {
    const response = await axios.get(apiUrl);  // Realiza la solicitud GET a la API
    habitaciones.value = response.data.map(habitacion => ({
      id_hab: habitacion.id_hab,  // ID de la habitación
      numerohab: habitacion.numerohab,  // Número de habitación
      dec_hab: habitacion.dec_hab,  // Descripción de la habitación
      cant_camas: habitacion.cant_camas,  // Cantidad de camas
      precio_hab: habitacion.precio_hab,  // Precio de la habitación
      estado: habitacion.estado,  // Estado (ocupada/libre)
    }));
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
  }
};

// Cargar las habitaciones cuando el componente se monta
onMounted(() => {
  fetchHabitaciones();
});
</script>

<template>
  <Fluid>
    <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
      <div class="font-semibold text-xl">Reporte de Ocupación de Habitaciones</div>
      <div class="mb-4">
        <p>Total de camas ocupadas: {{ camasOcupadas }}</p>
        <p>Total de camas libres: {{ camasLibres }}</p>
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">Número de Habitación</th>
            <th class="px-4 py-2">Descripción</th>
            <th class="px-4 py-2">Cantidad de Camas</th>
            <th class="px-4 py-2">Precio</th>
            <th class="px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="habitaciones.length === 0">
            <td class="border px-4 py-2 text-center" colspan="5">No hay habitaciones disponibles.</td>
          </tr>
          <tr v-for="(habitacion, index) in habitaciones" :key="index">
            <td class="border px-4 py-2">{{ habitacion.numerohab }}</td>
            <td class="border px-4 py-2">{{ habitacion.dec_hab }}</td>
            <td class="border px-4 py-2">{{ habitacion.cant_camas }}</td>
            <td class="border px-4 py-2">{{ habitacion.precio_hab }}</td>
            <td class="border px-4 py-2">{{ habitacion.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Fluid>
</template>

<style scoped>
.card {
    padding: 2em;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}
</style>
