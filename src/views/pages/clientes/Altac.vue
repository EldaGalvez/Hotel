<script setup>
import axios from 'axios';
import { ref } from 'vue';

const cliente = ref({
    nombre: '',
    ap_pat: '',
    ap_mat: '',
    telefono: '',
    rfc: '',
    email: '',
    direccion: ''
});

const guardarCliente = async () => {
    if (cliente.value.nombre && cliente.value.ap_pat) {
        try {
            await axios.post('/clientes', cliente.value); // Envia los datos al backend
            alert("Cliente guardado con éxito.");
            limpiarFormulario();
        } catch (error) {
            console.error('Error al guardar el cliente:', error);
            alert("Error al guardar el cliente.");
        }
    } else {
        alert("Por favor, completa los campos requeridos.");
    }
};

const limpiarFormulario = () => {
    cliente.value = {
        nombre: '',
        ap_pat: '',
        ap_mat: '',
        telefono: '',
        rfc: '',
        email: '',
        direccion: ''
    };
};
</script>

<template>
    <Fluid>
        <div class="card flex flex-col gap-4 w-full items-center" style="background-color: rgba(255, 255, 255, 0.8);">
            <div class="font-semibold text-xl text-center"><strong>Alta de Cliente</strong></div>
            <div class="flex flex-wrap gap-4 justify-center">
                <div class="w-full md:w-1/3">
                    <label for="nombre">Nombre</label>
                    <InputText id="nombre" type="text" v-model="cliente.nombre" class="w-full"/>
                </div>
                <div class="w-full md:w-1/3">
                    <label for="ap_pat">Apellido Paterno</label>
                    <InputText id="ap_pat" type="text" v-model="cliente.ap_pat" class="w-full"/>
                </div>
                <div class="w-full md:w-1/3">
                    <label for="ap_mat">Apellido Materno</label>
                    <InputText id="ap_mat" type="text" v-model="cliente.ap_mat" class="w-full"/>
                </div>
                <div class="w-full md:w-1/3">
                    <label for="telefono">Teléfono</label>
                    <InputText id="telefono" type="text" v-model="cliente.telefono" class="w-full"/>
                </div>
                <div class="w-full md:w-1/3">
                    <label for="rfc">RFC</label>
                    <InputText id="rfc" type="text" v-model="cliente.rfc" class="w-full"/>
                </div>
                <div class="w-full md:w-1/3">
                    <label for="email">Email</label>
                    <InputText id="email" type="text" v-model="cliente.email" class="w-full"/>
                </div>
                <div class="w-full md:w-1/3">
                    <label for="direccion">Dirección</label>
                    <Textarea id="direccion" rows="1" v-model="cliente.direccion" class="w-full"/>
                </div>
            </div>
            <Button label="Guardar Cliente" @click="guardarCliente" class="mt-4 p-button-secondary register-button">
                Guardar
            </Button>
        </div>
    </Fluid>
</template>

<style scoped>
.register-button {
    background-color: cornflowerblue;
    color: white;
    font-weight: bold;
    padding: 10px 20px; /* Tamaño original de padding */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 150px; /* Ancho fijo para hacer el botón más pequeño de largo */
    text-align: center;
}

.register-button:active {
    background-color: #377dff;
}
</style>
