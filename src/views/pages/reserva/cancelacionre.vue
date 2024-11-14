<script setup>
import { ref, watch } from 'vue';

// Definir la estructura de cancelación
const cancelacion = ref({
    nombreCliente: '',
    apellidoPaternoCliente: '',
    apellidoMaternoCliente: '',
    motivoCancelacion: '',
    idReserva: '',
    rfcCliente: ''
});

// Lista de cancelaciones (se llenará con los datos ingresados)
const cancelaciones = ref([]);

// Función para registrar la cancelación
const registerCancelacion = () => {
    if (validarRFC(cancelacion.value.rfcCliente)) {
        const nuevaCancelacion = {
            idCancelacion: cancelaciones.value.length + 1,
            fechaCancelacion: new Date().toLocaleDateString(),
            horaCancelacion: new Date().toLocaleTimeString(),
            nombreCliente: cancelacion.value.nombreCliente,
            apellidoPaternoCliente: cancelacion.value.apellidoPaternoCliente,
            apellidoMaternoCliente: cancelacion.value.apellidoMaternoCliente
        };
        cancelaciones.value.push(nuevaCancelacion);
        alert('Registro de cancelación de reserva exitoso');
        limpiarFormulario();
    } else {
        alert('RFC inválido. Por favor, verifica el RFC del cliente.');
    }
};

// Función para limpiar el formulario
const limpiarFormulario = () => {
    cancelacion.value = {
        nombreCliente: '',
        apellidoPaternoCliente: '',
        apellidoMaternoCliente: '',
        motivoCancelacion: '',
        idReserva: '',
        rfcCliente: ''
    };
};

// Función para validar el RFC
const validarRFC = (rfc) => {
    const regexRFC = /^([A-ZÑ&]{3,4})?(\d{2})(\d{2})(\d{2})?[A-Z\d]{3}$/;
    return regexRFC.test(rfc);
};

// Función para buscar cliente por RFC y llenar el ID de reserva
const buscarClientePorRFC = async () => {
    if (cancelacion.value.rfcCliente.length === 13) {
        try {
            const response = await fetch(`http://localhost:8080/api/cliente/${cancelacion.value.rfcCliente}`);
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const cliente = await response.json();

            if (cliente) {
                cancelacion.value.idReserva = cliente.idReserva;
                cancelacion.value.nombreCliente = cliente.nombre;
                cancelacion.value.apellidoPaternoCliente = cliente.apellidoPaterno;
                cancelacion.value.apellidoMaternoCliente = cliente.apellidoMaterno;
            } else {
                alert('Cliente no encontrado. Verifica el RFC.');
            }
        } catch (error) {
            console.error('Error al buscar cliente:', error);
            alert('Hubo un error al buscar al cliente.');
        }
    }
};

// Observamos el cambio del RFC para hacer la búsqueda automáticamente
watch(() => cancelacion.value.rfcCliente, buscarClientePorRFC);
</script>

<template>
  <Fluid>
    <div class="flex justify-center items-center h-full">
      <div class="card flex flex-col gap-4 items-center w-full max-w-4xl" style="background-color: rgba(255, 255, 255, 0.8);">
        <div class="font-semibold text-xl text-center"><strong>Cancelación de Reservación</strong></div>
        <div class="flex flex-wrap gap-4 justify-center">
          <div class="w-full md:w-1/2 lg:w-1/3">
            <label for="nombreCliente">Nombre del Cliente</label>
            <InputText id="nombreCliente" type="text" v-model="cancelacion.nombreCliente" class="w-full" disabled />
          </div>
          <div class="w-full md:w-1/2 lg:w-1/3">
            <label for="motivoCancelacion">Motivo de la Cancelación</label>
            <InputText id="motivoCancelacion" type="text" v-model="cancelacion.motivoCancelacion" class="w-full" required />
          </div>
          <div class="w-full md:w-1/2 lg:w-1/3">
            <label for="idReserva">ID de la Reserva</label>
            <InputText id="idReserva" type="text" v-model="cancelacion.idReserva" class="w-full" readonly />
          </div>
          <div class="w-full md:w-1/2 lg:w-1/3">
            <label for="rfcCliente">RFC del Cliente</label>
            <InputText id="rfcCliente" type="text" v-model="cancelacion.rfcCliente" class="w-full" required />
          </div>
        </div>
        <Button label="Registrar" @click="registerCancelacion" class="mt-4 p-button-secondary register-button">
          Registrar
        </Button>
      </div>
    </div>

    <!-- Tabla de Cancelaciones -->
    <div class="card mt-8">
      <div class="font-semibold text-xl text-center"><strong>Historial de Cancelaciones</strong></div>
      <table class="table-auto w-full mt-4">
        <thead>
          <tr>
            <th class="px-4 py-2">ID Cancelación</th>
            <th class="px-4 py-2">Fecha Cancelación</th>
            <th class="px-4 py-2">Hora Cancelación</th>
            <th class="px-4 py-2">Nombre Cliente</th>
            <th class="px-4 py-2">Apellido Paterno</th>
            <th class="px-4 py-2">Apellido Materno</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="cancelaciones.length === 0">
            <td colspan="6" class="text-center py-2">No hay cancelaciones registradas.</td>
          </tr>
          <tr v-for="(cancelacionItem, index) in cancelaciones" :key="index">
            <td class="border px-4 py-2">{{ cancelacionItem.idCancelacion }}</td>
            <td class="border px-4 py-2">{{ cancelacionItem.fechaCancelacion }}</td>
            <td class="border px-4 py-2">{{ cancelacionItem.horaCancelacion }}</td>
            <td class="border px-4 py-2">{{ cancelacionItem.nombreCliente }}</td>
            <td class="border px-4 py-2">{{ cancelacionItem.apellidoPaternoCliente }}</td>
            <td class="border px-4 py-2">{{ cancelacionItem.apellidoMaternoCliente }}</td>
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
  width: 100%;
}

label, input {
  margin: 0.5em 0;
}

.register-button {
  background-color: cornflowerblue;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
  text-align: center;
}

.register-button:active {
  background-color: #377dff;
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
