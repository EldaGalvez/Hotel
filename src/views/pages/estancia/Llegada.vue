<script setup>
import axios from 'axios';
import { ref } from 'vue';

const llegada = ref({
    idReserva: '',
    rfcCliente: '',
    fechaLlegada: '',
    horaLlegada: ''
});

const registerLlegada = async () => {
    try {
        const response = await axios.post('API', llegada.value);  // Reemplaza con la URL de tu API
        
        if (response.status !== 200) {
            throw new Error('Error en la solicitud');
        }

        alert('Registro de llegada exitoso');
        limpiarFormulario();
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al registrar la llegada');
    }
};

const limpiarFormulario = () => {
    llegada.value = {
        idReserva: '',
        rfcCliente: '',
        fechaLlegada: '',
        horaLlegada: ''
    };
};
</script>

<template>
    <Fluid>
        <div class="flex justify-center items-center h-full">
            <div class="card flex flex-col gap-4 w-full max-w-4xl mx-auto" style="background-color: rgba(255, 255, 255, 0.8);">
                <div class="font-semibold text-xl text-center"><strong>Registro de Llegada</strong></div>
                <div class="flex flex-wrap gap-4">
                    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
                        <label for="idReserva">ID de la Reserva</label>
                        <InputText id="idReserva" type="text" v-model="llegada.idReserva" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
                        <label for="rfcCliente">RFC del Cliente</label>
                        <InputText id="rfcCliente" type="text" v-model="llegada.rfcCliente" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
                        <label for="fechaLlegada">Check In</label>
                        <InputText id="fechaLlegada" type="date" v-model="llegada.fechaLlegada" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 mx-auto">
                        <label for="horaLlegada">Hora Llegada</label>
                        <InputText id="horaLlegada" type="time" v-model="llegada.horaLlegada" class="w-full" required />
                    </div>
                </div>
                <Button label="Check In" @click="registerLlegada" class="mt-4 register-button mx-auto">
                    Check In
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
    width: auto;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
