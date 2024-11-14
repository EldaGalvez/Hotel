<template>
    <Fluid>
      <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
        <div class="font-semibold text-xl">Estado de Habitaciones</div>
        <div class="flex flex-col gap-2">
          <input type="text" v-model="searchQuery" placeholder="Buscar habitación..." class="p-2 border border-gray-300 rounded"/>
        </div>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Número</th>
              <th class="px-4 py-2">Tipo</th>
              <th class="px-4 py-2">Camas</th>
              <th class="px-4 py-2">Precio</th>
              <th class="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="habitacion in filteredHabitaciones" :key="habitacion.id">
              <td class="border px-4 py-2">{{ habitacion.id }}</td>
              <td class="border px-4 py-2">{{ habitacion.numero }}</td>
              <td class="border px-4 py-2">{{ habitacion.tipo }}</td>
              <td class="border px-4 py-2">{{ habitacion.cantidadDeCamas }}</td>
              <td class="border px-4 py-2">{{ habitacion.precio }}</td>
              <td class="border px-4 py-2">{{ habitacion.estado }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fluid>
  </template>
  
  <script setup>
  import axios from 'axios';
import { computed, ref } from 'vue';
  
  const habitaciones = ref([]);
  const searchQuery = ref('');
  
  const filteredHabitaciones = computed(() => {
    if (!searchQuery.value) return habitaciones.value;
    return habitaciones.value.filter(habitacion =>
      habitacion.numero.toString().includes(searchQuery.value) ||
      habitacion.estado.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get('https://tu-api.com/habitaciones'); // ---------------  API -----------------------------
      habitaciones.value = response.data.map(habitacionApi => ({
        id: habitacionApi.id,
        numero: habitacionApi.numero,
        tipo: habitacionApi.tipo,
        cantidadDeCamas: habitacionApi.camas,
        precio: habitacionApi.precio,
        estado: habitacionApi.estado
      }));
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };
  
  // Llama a la función fetchData al cargar el componente
  fetchData();
  </script>