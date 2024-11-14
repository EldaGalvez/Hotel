<script setup>
import axios from 'axios';
import { ref } from 'vue';

const salida = ref({
    idReserva: '',
    checkOut: '',
    horaSalida: ''
});

const registerSalida = async () => {
    try {
        const response = await axios.post('https://tu-api.com/endpoint', salida.value);  // Reemplaza con la URL de tu API
        
        if (response.status !== 200) {
            throw new Error('Error en la solicitud');
        }

        alert('Registro de salida exitoso');
        limpiarFormulario();
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al registrar la salida');
    }
};

const limpiarFormulario = () => {
    salida.value = {
        idReserva: '',
        checkOut: '',
        horaSalida: ''
    };
};
</script>

<template>
    <Fluid>
        <div class="flex justify-center items-center h-full">
            <div class="card flex flex-col gap-4 w-full max-w-4xl mx-auto" style="background-color: rgba(255, 255, 255, 0.8);">
                <div class="font-semibold text-xl text-center"><strong>Registro Salida</strong></div>
                <div class="flex flex-wrap gap-4">
                    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
                        <label for="idReserva">ID de la Reserva</label>
                        <InputText id="idReserva" type="text" v-model="salida.idReserva" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
                        <label for="checkOut">Check Out</label>
                        <InputText id="checkOut" type="date" v-model="salida.checkOut" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
                        <label for="horaSalida">Hora Salida</label>
                        <InputText id="horaSalida" type="time" v-model="salida.horaSalida" class="w-full" required />
                    </div>
                </div>
                <Button label="Check Out" @click="registerSalida" class="mt-4 register-button mx-auto">
                    Check Out
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
    padding: 10px 30px;
    width: auto; /* Ajuste para hacer el botón más pequeño */
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
