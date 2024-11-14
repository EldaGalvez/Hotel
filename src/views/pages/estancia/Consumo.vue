<script setup>
import { onMounted, ref } from 'vue';


const serviciosDisponibles = ref([]);
const servicio = ref({
    idEstancia: '',
    idServicio: '',
    hora: '',
    dia: '',
    monto: 0
});

const servicios = ref([]);

//servicios de la API
const fetchServicios = async () => {
    try {
        const response = await fetch('API'); // ---------------------------- -API---------------------------------------
        const data = await response.json();
        
        if (response.ok) {
            serviciosDisponibles.value = data.map(servicio => ({
                label: servicio.nombre,
                value: servicio.id
            }));
        } else {
            console.error('Error al obtener los servicios:', data);
        }
    } catch (error) {
        console.error('Error en la solicitud de la API:', error);
    }
};

const registerServicio = () => {
    // Calculando el monto basado en la cantidad y el costo del servicio
    const montoServicio = 100; // Ejemplo de monto fijo (ajustar según sea necesario)
    
    // Agregar el nuevo servicio a la lista de servicios
    servicios.value.push({ 
        ...servicio.value,
        monto: montoServicio // Asignando el monto calculado
    });
    
    alert('Servicio registrado exitosamente');
    limpiarFormulario();
};

// Función para obtener el nombre del servicio a partir del id
const obtenerNombreServicio = (idServicio) => {
    const servicio = serviciosDisponibles.value.find(serv => serv.value === idServicio);
    return servicio ? servicio.label : 'Servicio no encontrado';
};

const limpiarFormulario = () => {
    servicio.value = {
        idEstancia: '',
        idServicio: '',
        hora: '',
        dia: '',
        monto: 0
    };
};

// Llamar a la API cuando el componente se monte
onMounted(() => {
    fetchServicios();
});
</script>

<template>
    <Fluid>
        <div class="flex justify-center items-center min-h-[80vh]">
            <div class="card flex flex-col gap-4 w-full max-w-4xl" style="background-color: rgba(255, 255, 255, 0.8); margin-top: -40px;">
                <div class="font-semibold text-xl text-center"><strong>Servicios Consumidos</strong></div>
                <div class="flex flex-wrap gap-4 justify-center">
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="idEstancia">ID Estancia</label>
                        <InputText id="idEstancia" type="text" v-model="servicio.idEstancia" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="idServicio">ID Servicio</label>
                        <Dropdown
                            id="idServicio"
                            v-model="servicio.idServicio"
                            :options="serviciosDisponibles"
                            optionLabel="label"
                            optionValue="value"
                            class="w-full"
                            required
                        />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="hora">Hora</label>
                        <InputText id="hora" type="time" v-model="servicio.hora" class="w-full" required />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3">
                        <label for="dia">Día</label>
                        <InputText id="dia" type="date" v-model="servicio.dia" class="w-full" required />
                    </div>
                </div>
                <div class="flex justify-center"> <!-- Contenedor centrado del botón -->
                    <Button label="Registrar" @click="registerServicio" class="mt-4 register-button">
                        Registrar
                    </Button>
                </div>

                <div class="mt-8">
                    <div class="font-semibold text-lg text-center"><strong>Servicios Registrados</strong></div>
                    <div class="overflow-x-auto mt-4">
                        <table class="table-auto w-full text-center">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2">ID Estancia</th>
                                    <th class="px-4 py-2">Servicio</th>
                                    <th class="px-4 py-2">ID Servicio</th>
                                    <th class="px-4 py-2">Hora</th>
                                    <th class="px-4 py-2">Día</th>
                                    <th class="px-4 py-2">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(serv, index) in servicios" :key="index">
                                    <td class="border px-4 py-2">{{ serv.idEstancia }}</td>
                                    <td class="border px-4 py-2">{{ obtenerNombreServicio(serv.idServicio) }}</td>
                                    <td class="border px-4 py-2">{{ serv.idServicio }}</td>
                                    <td class="border px-4 py-2">{{ serv.hora }}</td>
                                    <td class="border px-4 py-2">{{ serv.dia }}</td>
                                    <td class="border px-4 py-2">${{ serv.monto }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
    margin-top: -40px; /* Ajuste para mover el recuadro hacia arriba */
}

label, input {
    margin: 0.5em 0;
}

.register-button {
    background-color: cornflowerblue;
    color: white;
    font-weight: bold;
    padding: 8px 16px;  /* Haciendo el botón más pequeño */
    width: 150px;  /* Ancho fijo para hacerlo más pequeño */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    display: block; /* Asegura que el botón sea un bloque */
    margin-left: auto; /* Centrado horizontal */
    margin-right: auto; /* Centrado horizontal */
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    text-align: center;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}
</style>
