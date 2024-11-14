<script setup>
import axios from 'axios'; // Asegúrate de tener Axios instalado
import { computed, onMounted, ref } from 'vue';

const reservaciones = ref([]); // Lista vacía de reservaciones

const cargarReservaciones = async () => {
    try {
        const respuesta = await axios.get('reservaciones'); //----------API---------------
        reservaciones.value = respuesta.data; // Asigna la respuesta de la API a `reservaciones`
    } catch (error) {
        console.error("Error al cargar las reservaciones:", error);
    }
};

// Llama a `cargarReservaciones` cuando el componente se monte
onMounted(() => {
    cargarReservaciones();
});

// Cálculo del mes con más reservaciones
const mesMasReservaciones = computed(() => {
    const conteoPorMes = reservaciones.value.reduce((conteo, reserva) => {
        const mes = new Date(reserva.fecha_llegada).getMonth() + 1; // Obtener el mes (1-12)
        conteo[mes] = (conteo[mes] || 0) + 1;
        return conteo;
    }, {});

    const mesConMasReservas = Object.keys(conteoPorMes).reduce((a, b) => conteoPorMes[a] > conteoPorMes[b] ? a : b, 0);
    return mesConMasReservas;
});

const mesSeleccionado = ref('');
const reservacionesDelMes = computed(() => {
    return reservaciones.value.filter(reserva => {
        const mes = new Date(reserva.fecha_llegada).getMonth() + 1;
        return mes == mesSeleccionado.value;
    });
});
</script>

<template>
    <Fluid>
        <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
            <div class="font-semibold text-xl">Reporte de Reservaciones</div>
            <div class="mb-4">
                <p>El mes con más reservaciones: {{ mesMasReservaciones }}</p>
                <label for="mes">Seleccione un mes:</label>
                <select v-model="mesSeleccionado" id="mes" class="p-2 border border-gray-300 rounded">
                    <option value="">Selecciona un mes</option>
                    <option v-for="mes in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" :key="mes" :value="mes">{{ mes }}</option>
                </select>
            </div>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2">ID Reserva</th>
                        <th class="px-4 py-2">Nombre</th>
                        <th class="px-4 py-2">Apellido Paterno</th>
                        <th class="px-4 py-2">Apellido Materno</th>
                        <th class="px-4 py-2">RFC</th>
                        <th class="px-4 py-2">Tipo de Habitación</th>
                        <th class="px-4 py-2">Número de Habitación</th>
                        <th class="px-4 py-2">Estado</th>
                        <th class="px-4 py-2">Fecha de Llegada</th>
                        <th class="px-4 py-2">Fecha de Salida</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(reserva, index) in reservacionesDelMes" :key="index">
                        <td class="border px-4 py-2">{{ reserva.id_reserva }}</td>
                        <td class="border px-4 py-2">{{ reserva.nombre }}</td>
                        <td class="border px-4 py-2">{{ reserva.ap_pat }}</td>
                        <td class="border px-4 py-2">{{ reserva.ap_mat }}</td>
                        <td class="border px-4 py-2">{{ reserva.rfc }}</td>
                        <td class="border px-4 py-2">{{ reserva.tipo_hab }}</td>
                        <td class="border px-4 py-2">{{ reserva.numero_hab }}</td>
                        <td class="border px-4 py-2">{{ reserva.estado }}</td>
                        <td class="border px-4 py-2">{{ reserva.fecha_llegada }}</td>
                        <td class="border px-4 py-2">{{ reserva.fecha_salida }}</td>
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
