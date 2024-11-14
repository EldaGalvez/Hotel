<script setup>
import { onMounted, ref } from 'vue';

// Lista vacía de cancelaciones
const cancelaciones = ref([]);

// Función para obtener las cancelaciones desde la API
const obtenerCancelaciones = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/cancelaciones'); // ---------------------- API --------------------------
    if (!response.ok) {
      throw new Error('Error al obtener las cancelaciones');
    }

    // Asumimos que la API devuelve un array de objetos con los campos esperados
    cancelaciones.value = await response.json();
  } catch (error) {
    console.error('Hubo un error al obtener las cancelaciones:', error);
  }
};

// Obtener las cancelaciones cuando el componente se monta
onMounted(() => {
  obtenerCancelaciones();
});
</script>

<template>
    <Fluid>
        <div class="mt-8 card flex flex-col gap-4 w-full" style="background-color: rgba(255, 255, 255, 0.8);">
            <div class="font-semibold text-xl">Reporte de Cancelaciones</div>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2">ID Cancelación</th>
                        <th class="px-4 py-2">Fecha de Cancelación</th>
                        <th class="px-4 py-2">Hora de Cancelación</th>
                        <th class="px-4 py-2">Nombre del Cliente</th>
                        <th class="px-4 py-2">Apellido Paterno</th>
                        <th class="px-4 py-2">Apellido Materno</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Si no hay cancelaciones, muestra un mensaje -->
                    <tr v-if="cancelaciones.length === 0">
                        <td colspan="6" class="text-center py-4">No hay cancelaciones registradas</td>
                    </tr>
                    <!-- Si hay cancelaciones, muestra los datos en las filas -->
                    <tr v-for="(cancelacion, index) in cancelaciones" :key="index">
                        <td class="border px-4 py-2">{{ cancelacion.id_cancelacion }}</td>
                        <td class="border px-4 py-2">{{ cancelacion.fecha_can }}</td>
                        <td class="border px-4 py-2">{{ cancelacion.hora_can }}</td>
                        <td class="border px-4 py-2">{{ cancelacion.nombre_cliente }}</td>
                        <td class="border px-4 py-2">{{ cancelacion.ap_pat_cliente }}</td>
                        <td class="border px-4 py-2">{{ cancelacion.ap_mat_cliente }}</td>
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
