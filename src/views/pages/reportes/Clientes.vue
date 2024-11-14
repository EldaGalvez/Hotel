<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const clientes = ref([]);

const searchQuery = ref('');
const apiUrl = 'http://localhost:8080/api/clientes'; // ---------- API

const filteredClientes = computed(() => {
  if (!searchQuery.value) {
    return clientes.value;
  }
  return clientes.value.filter(cliente => 
    cliente.id_cliente.toString().includes(searchQuery.value) ||
    cliente.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cliente.ap_pat.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cliente.ap_mat.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cliente.telefono.includes(searchQuery.value) ||
    cliente.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchClientes = async () => {
  try {
    const response = await axios.get(apiUrl);
    clientes.value = response.data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  }
};

onMounted(() => {
  fetchClientes();
});
</script>

<template>
  <Fluid>
    <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
      <div class="font-semibold text-xl">Reporte de Clientes</div>
      <div class="flex flex-col gap-2">
        <input type="text" v-model="searchQuery" placeholder="Buscar cliente..." class="p-2 border border-gray-300 rounded"/>
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">ID Cliente</th>
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Apellido Paterno</th>
            <th class="px-4 py-2">Apellido Materno</th>
            <th class="px-4 py-2">Teléfono</th>
            <th class="px-4 py-2">RFC</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Dirección</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredClientes.length === 0">
            <td class="border px-4 py-2 text-center" colspan="8">No hay clientes disponibles.</td>
          </tr>
          <tr v-for="(cliente, index) in filteredClientes" :key="index">
            <td class="border px-4 py-2">{{ cliente.id_cliente }}</td>
            <td class="border px-4 py-2">{{ cliente.nombre }}</td>
            <td class="border px-4 py-2">{{ cliente.ap_pat }}</td>
            <td class="border px-4 py-2">{{ cliente.ap_mat }}</td>
            <td class="border px-4 py-2">{{ cliente.telefono }}</td>
            <td class="border px-4 py-2">{{ cliente.rfc }}</td>
            <td class="border px-4 py-2">{{ cliente.email }}</td>
            <td class="border px-4 py-2">{{ cliente.direccion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Fluid>
</template>

<style scoped>
/* Estilos */
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
