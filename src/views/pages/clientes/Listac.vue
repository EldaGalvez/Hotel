<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const clientes = ref([]);

const searchQuery = ref('');
const apiUrl = 'http://localhost:8080/api/clientes'; // Ajustar URL de la API
const clienteEdit = ref({ id: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', telefono: '', rfc: '', correo: '', direccion: '' });
const showModal = ref(false);

const filteredClientes = computed(() => {
  if (!searchQuery.value) {
    return clientes.value;
  }
  return clientes.value.filter(cliente => 
    cliente.id.toString().includes(searchQuery.value) ||
    cliente.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cliente.apellidoPaterno.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cliente.apellidoMaterno.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cliente.telefono.includes(searchQuery.value) ||
    cliente.correo.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const eliminarCliente = (index) => {
  clientes.value.splice(index, 1);
};

const modificarCliente = (index) => {
  clienteEdit.value = { ...clientes.value[index], index };
  showModal.value = true;
};

const fetchClientes = async () => {
  try {
    const response = await axios.get(apiUrl);
    clientes.value = response.data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  }
};

const guardarCliente = () => {
  const { index, ...clienteModificado } = clienteEdit.value;
  clientes.value[index] = clienteModificado;
  cancelarEdicion();
};

const cancelarEdicion = () => {
  clienteEdit.value = { id: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', telefono: '', rfc: '', correo: '', direccion: '' };
  showModal.value = false;
};

onMounted(() => {
  fetchClientes();
});
</script>

<template>
  <Fluid>
    <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
      <div class="font-semibold text-xl">Lista de Clientes</div>
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
            <th class="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredClientes.length === 0">
            <td class="border px-4 py-2 text-center" colspan="9">No hay clientes disponibles.</td>
          </tr>
          <tr v-for="(cliente, index) in filteredClientes" :key="index">
            <td class="border px-4 py-2">{{ cliente.id }}</td>
            <td class="border px-4 py-2">{{ cliente.nombre }}</td>
            <td class="border px-4 py-2">{{ cliente.apellidoPaterno }}</td>
            <td class="border px-4 py-2">{{ cliente.apellidoMaterno }}</td>
            <td class="border px-4 py-2">{{ cliente.telefono }}</td>
            <td class="border px-4 py-2">{{ cliente.rfc }}</td>
            <td class="border px-4 py-2">{{ cliente.correo }}</td>
            <td class="border px-4 py-2">{{ cliente.direccion }}</td>
            <td class="border px-4 py-2 flex gap-2">
              <Button icon="pi pi-pencil" @click="modificarCliente(index)" class="p-button-warning"></Button>
              <Button icon="pi pi-trash" @click="eliminarCliente(index)" class="p-button-danger"></Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white p-4 rounded-lg w-1/3">
        <div class="font-semibold text-xl">Modificar Cliente</div>
        <div class="flex flex-col gap-1 mt-4">
          <label>ID Cliente</label>
          <input type="text" v-model="clienteEdit.id" class="p-1 border border-gray-300 rounded" readonly/>
          <label>Nombre</label>
          <input type="text" v-model="clienteEdit.nombre" class="p-1 border border-gray-300 rounded"/>
          <label>Apellido Paterno</label>
          <input type="text" v-model="clienteEdit.apellidoPaterno" class="p-1 border border-gray-300 rounded"/>
          <label>Apellido Materno</label>
          <input type="text" v-model="clienteEdit.apellidoMaterno" class="p-1 border border-gray-300 rounded"/>
          <label>Teléfono</label>
          <input type="text" v-model="clienteEdit.telefono" class="p-1 border border-gray-300 rounded"/>
          <label>RFC</label>
          <input type="text" v-model="clienteEdit.rfc" class="p-1 border border-gray-300 rounded" readonly/>
          <label>Email</label>
          <input type="text" v-model="clienteEdit.correo" class="p-1 border border-gray-300 rounded"/>
          <label>Dirección</label>
          <input type="text" v-model="clienteEdit.direccion" class="p-1 border border-gray-300 rounded"/>
          <div class="flex justify-end gap-1 mt-2">
            <Button label="Guardar" @click="guardarCliente" class="p-button" :style="{ backgroundColor: 'cornflowerblue', borderColor: 'cornflowerblue' }"></Button>
            <Button label="Cancelar" @click="cancelarEdicion" class="p-button" :style="{ backgroundColor: 'red', borderColor: 'red' }"></Button>
          </div>
        </div>
      </div>
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
