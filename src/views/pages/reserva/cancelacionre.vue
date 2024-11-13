<script setup>
import { ref } from 'vue';

// Definir la estructura de cancelación
const cancelacion = ref({
    nombreCliente: '',
    motivoCancelacion: '',
    idCliente: '',
    rfcCliente: ''
});

// Función para registrar la cancelación
const registerCancelacion = () => {
    if (validarRFC(cancelacion.value.rfcCliente)) {
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
        motivoCancelacion: '',
        idCliente: '',
        rfcCliente: ''
    };
};

// Función para validar el RFC
const validarRFC = (rfc) => {
    const regexRFC = /^([A-ZÑ&]{3,4})?(\\d{2})(\\d{2})(\\d{2})?[A-Z\\d]{3}$/;
    return regexRFC.test(rfc);
};

// Función para buscar cliente por RFC y llenar el ID
const buscarClientePorRFC = async () => {
    if (cancelacion.value.rfcCliente.length === 13) {
        try {
            // Aquí llamamos a la API para obtener el cliente por RFC
            // Reemplaza la URL con la de tu API que reciba el RFC y retorne el cliente
            const response = await fetch(`http://localhost:8080/api/cliente/${cancelacion.value.rfcCliente}`);
            const cliente = await response.json();

            if (cliente) {
                cancelacion.value.idCliente = cliente.idCliente;
                cancelacion.value.nombreCliente = cliente.nombre; // Si quieres llenar también el nombre
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
                        <label for="idCliente">ID del Cliente</label>
                        <InputText id="idCliente" type="text" v-model="cancelacion.idCliente" class="w-full" disabled />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="rfcCliente">RFC del Cliente</label>
                        <InputText id="rfcCliente" type="text" v-model="cancelacion.rfcCliente" class="w-full" required />
                    </div>
                </div>
                <Button label="Registrar" @click="registerCancelacion" class="mt-4 register-button">
                    Registrar
                </Button>
            </div>
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
}
</style>
