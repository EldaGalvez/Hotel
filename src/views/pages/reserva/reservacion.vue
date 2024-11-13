<template>
    <Fluid>
        <div class="flex justify-center items-center h-full">
            <div class="card flex flex-col gap-4 items-center w-full max-w-4xl" style="background-color: rgba(255, 255, 255, 0.8);">
                <div class="font-semibold text-xl text-center"><strong>Registro de Reserva de Habitación</strong></div>
                <div class="flex flex-wrap gap-4 justify-center">
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="nombreCliente">Nombre del Cliente</label>
                        <InputText id="nombreCliente" type="text" v-model="reservaHab.nombreCliente" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="apellidoPaterno">Apellido Paterno</label>
                        <InputText id="apellidoPaterno" type="text" v-model="reservaHab.apellidoPaterno" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="apellidoMaterno">Apellido Materno</label>
                        <InputText id="apellidoMaterno" type="text" v-model="reservaHab.apellidoMaterno" class="w-full" />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="telefono">Teléfono</label>
                        <InputText id="telefono" type="text" v-model="reservaHab.telefono" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="rfc">RFC</label>
                        <InputText id="rfc" type="text" v-model="reservaHab.rfc" class="w-full" required @blur="verificarCliente" />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="direccion">Dirección</label>
                        <InputText id="direccion" type="text" v-model="reservaHab.direccion" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="emailCliente">Email del Cliente</label>
                        <InputText id="emailCliente" type="email" v-model="reservaHab.emailCliente" class="w-full" required @blur="verificarCliente" />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="fechaLlegada">Fecha de Llegada</label>
                        <InputText id="fechaLlegada" type="date" v-model="reservaHab.fechaLlegada" class="w-full" required @change="validarFechas" />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="fechaSalida">Fecha de Salida</label>
                        <InputText id="fechaSalida" type="date" v-model="reservaHab.fechaSalida" class="w-full" required @change="validarFechas" />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="tipoHabitacion">Tipo de Habitación Preferida</label>
                        <select id="tipoHabitacion" v-model="reservaHab.tipoHabitacion" class="w-full" required>
                            <option value="" disabled>Selecciona el tipo de habitación</option>
                            <option v-for="habitacion in tiposHabitacion" :key="habitacion.id" :value="habitacion.nombre">
                                {{ habitacion.nombre }}
                            </option>
                        </select>
                    </div>
                </div>
                <Button label="Registrar" @click="registerReservaHab" class="mt-4 register-button">
                    Registrar
                </Button>
            </div>
        </div>
    </Fluid>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const reservaHab = ref({
            nombreCliente: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            telefono: '',
            rfc: '',
            direccion: '',
            emailCliente: '',
            fechaLlegada: '',
            fechaSalida: '',
            tipoHabitacion: ''
        });

        const tiposHabitacion = ref([]);

        const validarFechas = () => {
            if (new Date(reservaHab.value.fechaLlegada) >= new Date(reservaHab.value.fechaSalida)) {
                alert('La Fecha de Salida debe ser posterior a la Fecha de Llegada');
                reservaHab.value.fechaSalida = '';
            }
        };

        const fetchTiposHabitacion = async () => {
            try {
                const response = await axios.get('TU_ENDPOINT_API/tiposHabitacion');
                tiposHabitacion.value = response.data;
            } catch (error) {
                alert('Error al obtener los tipos de habitación');
            }
        };

        const registerReservaHab = async () => {
            try {
                const response = await axios.post('TU_ENDPOINT_API/reservas', reservaHab.value);           //API
                if (response.status === 200) {
                    alert('Registro de reserva de habitación exitoso');
                    limpiarFormulario();
                } else {
                    alert('Hubo un problema al registrar la reserva');
                }
            } catch (error) {
                alert('Error al conectar con el servidor');
            }
        };

        const limpiarFormulario = () => {
            reservaHab.value = {
                nombreCliente: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                telefono: '',
                rfc: '',
                direccion: '',
                emailCliente: '',
                fechaLlegada: '',
                fechaSalida: '',
                tipoHabitacion: ''
            };
        };

        const verificarCliente = async () => {
            try {
                const response = await axios.post('TU_ENDPOINT_API/verificarCliente', {
                    email: reservaHab.value.emailCliente,
                    rfc: reservaHab.value.rfc
                });
                if (response.data.exists) {
                    alert('Cliente ya existe en la base de datos');
                } else {
                    alert('Cliente no encontrado, se procederá a registrar uno nuevo');
                }
            } catch (error) {
                alert('Error al verificar el cliente');
            }
        };

        onMounted(() => {
            fetchTiposHabitacion();
        });

        return { reservaHab, tiposHabitacion, registerReservaHab, validarFechas, verificarCliente };
    }
};
</script>

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
    background-color: #4d4d4d;
}
</style>
