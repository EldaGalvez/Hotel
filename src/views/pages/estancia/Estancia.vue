<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const estancias = ref([]);
const serviciosDisponibles = ref(['Taxi', 'Lavandería', 'Room Service']);
const searchQuery = ref('');
const estanciaEdit = ref({
  id_estancia: '',
  id_cliente: '',
  id_reserva: '',
  fecha_llegada: '',
  hora_llegada: '',
  fecha_salida: '',
  hora_salida: '',
  dias: 0,
  serviciosConsumidos: []
});
const showModal = ref(false);

// Cargar estancias desde la API
const fetchEstancias = async () => {
  try {
    const response = await axios.get('API'); // ------------------------------------ API ---------------------------------------
    estancias.value = response.data;
  } catch (error) {
    console.error('Error al obtener estancias:', error);
  }
};

// Filtrar estancias según la búsqueda
const filteredEstancias = computed(() => {
  if (!searchQuery.value) {
    return estancias.value;
  }
  return estancias.value.filter(estancia =>
    estancia.id_estancia.toString().includes(searchQuery.value) ||
    estancia.id_cliente.toString().includes(searchQuery.value) ||
    estancia.id_reserva.toString().includes(searchQuery.value) ||
    estancia.fecha_llegada.includes(searchQuery.value) ||
    estancia.hora_llegada.includes(searchQuery.value) ||
    estancia.dias.toString().includes(searchQuery.value)
  );
});

// Cargar la estancia en el formulario de edición
const modificarEstancia = (index) => {
  estanciaEdit.value = { ...estancias.value[index] };

  // Asegúrate de que los servicios ya consumidos estén marcados
  estanciaEdit.value.serviciosConsumidos = [...estancias.value[index].serviciosConsumidos];

  showModal.value = true;
};

// Guardar los cambios en la estancia
const guardarEstancia = async () => {
  try {
    if (estanciaEdit.value.id_estancia) {
      // Enviar los datos modificados a la API
      await axios.put(`http://localhost:8080/api/estancias/${estanciaEdit.value.id_estancia}`, estanciaEdit.value); // ------------------------------------ API ---------------------------------------
    } else {
      // Crear una nueva estancia
      await axios.post('API', estanciaEdit.value); // ------------------------------------ API ---------------------------------------
    }
    cancelarEdicion();
  } catch (error) {
    console.error('Error al guardar la estancia:', error);
  }
};

// Cancelar la edición
const cancelarEdicion = () => {
  estanciaEdit.value = {
    id_estancia: '',
    id_cliente: '',
    id_reserva: '',
    fecha_llegada: '',
    hora_llegada: '',
    fecha_salida: '',
    hora_salida: '',
    dias: 0,
    serviciosConsumidos: []
  };
  showModal.value = false;
};

onMounted(() => {
  fetchEstancias();
});
</script>

<template>
  <Fluid>
    <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
      <div class="font-semibold text-xl">Estancias</div>
      <div class="flex flex-col gap-2">
        <input type="text" v-model="searchQuery" placeholder="Buscar estancia..." class="p-2 border border-gray-300 rounded"/>
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">ID Estancia</th>
            <th class="px-4 py-2">ID Cliente</th>
            <th class="px-4 py-2">ID Reserva</th>
            <th class="px-4 py-2">Fecha Llegada</th>
            <th class="px-4 py-2">Hora Llegada</th>
            <th class="px-4 py-2">Fecha Salida</th>
            <th class="px-4 py-2">Hora Salida</th>
            <th class="px-4 py-2">Días</th>
            <th class="px-4 py-2">Servicios Consumidos</th>
            <th class="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredEstancias.length === 0">
            <td class="border px-4 py-2 text-center" colspan="10">No hay estancias disponibles.</td>
          </tr>
          <tr v-for="(estancia, index) in filteredEstancias" :key="estancia.id_estancia">
            <td class="border px-4 py-2">{{ estancia.id_estancia }}</td>
            <td class="border px-4 py-2">{{ estancia.id_cliente }}</td>
            <td class="border px-4 py-2">{{ estancia.id_reserva }}</td>
            <td class="border px-4 py-2">{{ estancia.fecha_llegada }}</td>
            <td class="border px-4 py-2">{{ estancia.hora_llegada }}</td>
            <td class="border px-4 py-2">{{ estancia.fecha_salida }}</td>
            <td class="border px-4 py-2">{{ estancia.hora_salida }}</td>
            <td class="border px-4 py-2">{{ estancia.dias }}</td>
            <td class="border px-4 py-2">{{ estancia.serviciosConsumidos.join(', ') }}</td>
            <td class="border px-4 py-2 flex gap-2">
              <Button icon="pi pi-pencil" @click="modificarEstancia(index)" class="p-button-warning"></Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para editar la estancia -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white p-4 rounded-lg w-1/3">
        <div class="font-semibold text-xl">Modificar Estancia</div>
        <div class="flex flex-col gap-1 mt-4">
          <label>ID Estancia</label>
          <input type="text" v-model="estanciaEdit.id_estancia" class="p-1 border border-gray-300 rounded" readonly/>
          <label>ID Cliente</label>
          <input type="text" v-model="estanciaEdit.id_cliente" class="p-1 border border-gray-300 rounded" readonly/>
          <label>ID Reserva</label>
          <input type="text" v-model="estanciaEdit.id_reserva" class="p-1 border border-gray-300 rounded" readonly/>
          <label>Fecha de Llegada</label>
          <input type="date" v-model="estanciaEdit.fecha_llegada" class="p-1 border border-gray-300 rounded"/>
          <label>Hora de Llegada</label>
          <input type="time" v-model="estanciaEdit.hora_llegada" class="p-1 border border-gray-300 rounded"/>
          <label>Fecha de Salida</label>
          <input type="date" v-model="estanciaEdit.fecha_salida" class="p-1 border border-gray-300 rounded"/>
          <label>Hora de Salida</label>
          <input type="time" v-model="estanciaEdit.hora_salida" class="p-1 border border-gray-300 rounded"/>
          <label>Días de Estancia</label>
          <input type="number" v-model="estanciaEdit.dias" class="p-1 border border-gray-300 rounded"/>
          <label>Servicios Consumidos</label>
          <div class="flex flex-col">
            <div v-for="(servicio, index) in serviciosDisponibles" :key="index">
              <input 
                type="checkbox" 
                :id="servicio" 
                :value="servicio"
                v-model="estanciaEdit.serviciosConsumidos"
              />
              <label :for="servicio">{{ servicio }}</label>
            </div>
          </div>
          <div class="flex justify-end gap-1 mt-2">
            <Button label="Guardar" @click="guardarEstancia" class="p-button" :style="{ backgroundColor: 'cornflowerblue', borderColor: 'cornflowerblue' }"></Button>
            <Button label="Cancelar" @click="cancelarEdicion" class="p-button" :style="{ backgroundColor: 'red', borderColor: 'red' }"></Button>
          </div>
        </div>
      </div>
    </div>
  </Fluid>
</template>
