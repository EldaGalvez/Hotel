<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const barData = ref(null);
const barOptions = ref(null);

onMounted(async () => {
    await fetchDataFromAPI();
    setColorOptions();
});

async function fetchDataFromAPI() {
    try {
        const response = await axios.get('API'); //------------------API---------------------------
        const data = response.data;

        const occupationCount = {};

        data.forEach(habitacion => {
            if (habitacion.estado === 'ocupado') {
                if (!occupationCount[habitacion.numero]) {
                    occupationCount[habitacion.numero] = 0;
                }
                occupationCount[habitacion.numero]++;
            }
        });

        const labels = Object.keys(occupationCount);
        const counts = Object.values(occupationCount);

        barData.value = {
            labels: labels,
            datasets: [
                {
                    label: 'Ocupaciones',
                    backgroundColor: 'rgba(54, 162, 235, 0.8)', // Azul
                    borderColor: 'rgba(54, 162, 235, 1)',
                    data: counts
                }
            ]
        };
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

function setColorOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    barOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            },
            title: {
                display: true,
                text: 'Informe de Habitaciones',
                color: textColor,
                font: {
                    size: 20
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
</script>

<template>
    <Fluid class="grid grid-cols-12 gap-8">
        <div class="col-span-12">
            <div class="card w-full h-full flex justify-center items-center">
                <Chart type="bar" :data="barData" :options="barOptions" class="w-full"></Chart>
            </div>
        </div>
    </Fluid>
</template>
