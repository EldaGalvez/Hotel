<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const reservas = ref([]);
const searchQuery = ref('');
const mensajeError = ref('');
const apiUrl = 'API'; //---------------------------- API ------------------------------
const reservaEdit = ref({
    id: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    tipoHabitacion: '',
    numeroHabitacion: '',
    estadoReserva: '',
    fechaLlegada: '',
    fechaSalida: ''
});
const showModal = ref(false);

const filteredReservas = computed(() => {
    if (!searchQuery.value) {
        return reservas.value.filter(reserva => reserva.estadoReserva === 'activa');
    }
    return reservas.value.filter(reserva =>
        reserva.estadoReserva === 'activa' &&
        (
            reserva.id.toString().includes(searchQuery.value) ||
            reserva.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            reserva.apellidoPaterno.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            reserva.apellidoMaterno.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            reserva.tipoHabitacion.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            reserva.numeroHabitacion.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    );
});

const guardarReserva = async () => {
    if (!mensajeError.value) {
        try {
            // Actualizar el objeto de la reserva editada en la lista
            const index = reservas.value.findIndex(r => r.id === reservaEdit.value.id);
            if (index !== -1) {
                reservas.value[index] = { ...reservaEdit.value }; // Se actualiza la reserva
                showModal.value = false; // Cerrar el modal después de guardar
            }
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
        }
    }
};

const modificarReserva = (index) => {
    reservaEdit.value = { ...reservas.value[index] };
    showModal.value = true;
};

const cancelarEdicion = () => {
    reservaEdit.value = {
        id: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        tipoHabitacion: '',
        numeroHabitacion: '',
        estadoReserva: '',
        fechaLlegada: '',
        fechaSalida: ''
    };
    showModal.value = false;
};

onMounted(() => {
    fetchReservas();
});

const fetchReservas = async () => {
    try {
        const response = await axios.get(apiUrl);
        reservas.value = response.data;
    } catch (error) {
        console.error('Error al obtener reservas:', error);
    }
};
</script>

<template>
  <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
    <div class="font-semibold text-xl">Lista de Reservas Activas</div>
    <div class="flex flex-col gap-2">
      <input type="text" v-model="searchQuery" placeholder="Buscar reserva..." class="p-2 border border-gray-300 rounded"/>
    </div>
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Nombre</th>
          <th class="px-4 py-2">Apellido Paterno</th>
          <th class="px-4 py-2">Apellido Materno</th>
          <th class="px-4 py-2">Tipo de Habitación</th>
          <th class="px-4 py-2">Número de Habitación</th>
          <th class="px-4 py-2">Estado</th>
          <th class="px-4 py-2">Fecha Llegada</th>
          <th class="px-4 py-2">Fecha Salida</th>
          <th class="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredReservas.length === 0">
          <td class="border px-4 py-2 text-center" colspan="10">No hay reservas activas disponibles.</td>
        </tr>
        <tr v-for="(reserva, index) in filteredReservas" :key="index">
          <td class="border px-4 py-2">{{ reserva.id }}</td>
          <td class="border px-4 py-2">{{ reserva.nombre }}</td>
          <td class="border px-4 py-2">{{ reserva.apellidoPaterno }}</td>
          <td class="border px-4 py-2">{{ reserva.apellidoMaterno }}</td>
          <td class="border px-4 py-2">{{ reserva.tipoHabitacion }}</td>
          <td class="border px-4 py-2">{{ reserva.numeroHabitacion }}</td>
          <td class="border px-4 py-2">{{ reserva.estadoReserva }}</td>
          <td class="border px-4 py-2">{{ reserva.fechaLlegada }}</td>
          <td class="border px-4 py-2">{{ reserva.fechaSalida }}</td>
          <td class="border px-4 py-2 flex gap-2">
            <button @click="modificarReserva(index)" class="p-button p-2" style="background-color: cornflowerblue; border-color: cornflowerblue;">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal -->
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white p-4 rounded-lg w-1/3">
      <div class="font-semibold text-xl">Modificar Reserva</div>
      <div class="flex flex-col gap-1 mt-4">
        <label>ID</label>
        <input type="text" v-model="reservaEdit.id" class="p-1 border border-gray-300 rounded" disabled/>
        <label>Nombre</label>
        <input type="text" v-model="reservaEdit.nombre" class="p-1 border border-gray-300 rounded"/>
        <label>Apellido Paterno</label>
        <input type="text" v-model="reservaEdit.apellidoPaterno" class="p-1 border border-gray-300 rounded"/>
        <label>Apellido Materno</label>
        <input type="text" v-model="reservaEdit.apellidoMaterno" class="p-1 border border-gray-300 rounded"/>
        <label>Tipo de Habitación</label>
        <input type="text" v-model="reservaEdit.tipoHabitacion" class="p-1 border border-gray-300 rounded"/>
        <label>Número de Habitación</label>
        <input type="text" v-model="reservaEdit.numeroHabitacion" class="p-1 border border-gray-300 rounded" disabled/>
        <label>Estado</label>
        <input type="text" v-model="reservaEdit.estadoReserva" class="p-1 border border-gray-300 rounded" disabled/>
        <label>Fecha Llegada</label>
        <input type="date" v-model="reservaEdit.fechaLlegada" class="p-1 border border-gray-300 rounded"/>
        <label>Fecha Salida</label>
        <input type="date" v-model="reservaEdit.fechaSalida" class="p-1 border border-gray-300 rounded"/>
        <div class="flex justify-end gap-1 mt-2">
          <button @click="guardarReserva" class="p-button p-2" style="background-color: cornflowerblue; border-color: cornflowerblue; font-weight: bold; color: white;">Guardar</button>
          <button @click="cancelarEdicion" class="p-button p-2" style="background-color: red; border-color: red; font-weight: bold; color: white;">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
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
button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  opacity: 0.8;
}
</style>
