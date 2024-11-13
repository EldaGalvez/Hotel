<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const reservas = ref([]);

const searchQuery = ref('');

const filteredReservas = computed(() => {
    if (!searchQuery.value) {
        return reservas.value;
    }
    return reservas.value.filter(reserva =>
        reserva.id.toString().includes(searchQuery.value) ||
        reserva.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        reserva.apellidoPaterno.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        reserva.apellidoMaterno.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        reserva.telefono.includes(searchQuery.value) ||
        reserva.correo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        reserva.estadoReserva.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const eliminarReserva = (index) => {
    reservas.value.splice(index, 1);
};

const modificarReserva = (index) => {
    // Lógica para modificar la reserva
    console.log('Modificar reserva:', reservas.value[index]);
};

const fetchReservas = async () => {
    try {
        const response = await axios.get('/api/reservas'); // Ajustar API
        reservas.value = response.data;
    } catch (error) {
        console.error('Error al obtener reservas:', error);
    }
};

onMounted(() => {
    fetchReservas();
});
</script>

<template>
    <Fluid>
        <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
            <div class="font-semibold text-xl">Lista de Reservas</div>
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
                        <th class="px-4 py-2">Teléfono</th>
                        <th class="px-4 py-2">Correo</th>
                        <th class="px-4 py-2">Estado de la Reserva</th>
                        <th class="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredReservas.length === 0">
                        <td class="border px-4 py-2 text-center" colspan="8">No hay reservas disponibles.</td>
                    </tr>
                    <tr v-for="(reserva, index) in filteredReservas" :key="index">
                        <td class="border px-4 py-2">{{ reserva.id }}</td>
                        <td class="border px-4 py-2">{{ reserva.nombre }}</td>
                        <td class="border px-4 py-2">{{ reserva.apellidoPaterno }}</td>
                        <td class="border px-4 py-2">{{ reserva.apellidoMaterno }}</td>
                        <td class="border px-4 py-2">{{ reserva.telefono }}</td>
                        <td class="border px-4 py-2">{{ reserva.correo }}</td>
                        <td class="border px-4 py-2">{{ reserva.estadoReserva }}</td>
                        <td class="border px-4 py-2 flex gap-2">
                            <Button icon="pi pi-pencil" @click="modificarReserva(index)" class="p-button-warning"></Button>
                            <Button icon="pi pi-trash" @click="eliminarReserva(index)" class="p-button-danger"></Button>
                        </td>
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

button {
    margin: 5px;
}
</style>
