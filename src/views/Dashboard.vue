<script setup>
import { ref } from 'vue';

// Lista de habitaciones
const habitaciones = ref([
    { nombre: 'Suite Presidencial', precio: 350.00, image: 'habitacion_presidencia.jpg' },
    { nombre: 'Habitación Doble', precio: 150.00, image: 'habitacion_doble.jpg' },
    { nombre: 'Habitación Sencilla', precio: 100.00, image: 'habitacion_sencilla.jpg' },
    { nombre: 'Suite Luna de Miel', precio: 250.00, image: 'habitacion_luna.jpg' },
    { nombre: 'Habitación Familiar', precio: 200.00, image: 'habitacion_familiar.jpg' },
    { nombre: 'Habitación de Lujo', precio: 300.00, image: 'habitacion_lujo.jpg' }
]);

// Función para formatear el precio
const formatCurrency = (value) => {
    return value.toLocaleString('es-ES', { style: 'currency', currency: 'MXN' });
};
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <!-- Panel de Habitaciones -->
        <div class="col-span-12">
            <div class="card">
                <div class="font-semibold text-xl mb-4">Lista de Habitaciones</div>
                <DataTable :value="habitaciones" :rows="3" :paginator="true" responsiveLayout="scroll">
                    <Column style="width: 15%" header="Imagen">
                        <template #body="slotProps">
                            <img src="@/assets/habitacion_doble.jpg" alt="Habitacion doble" style="width: 150px; height: auto;" />
                        </template>
                    </Column>
                    <Column field="nombre" header="Nombre" :sortable="true" style="width: 35%"></Column>
                    <Column field="precio" header="Precio" :sortable="true" style="width: 35%">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.precio) }}
                        </template>
                    </Column>
                    <Column style="width: 15%" header="Acciones">
                        <template #body>
                            <Button icon="pi pi-info-circle" label="Más Información" class="p-button-text"></Button>
                            <Button icon="pi pi-shopping-cart" label="Reservar" class="p-button-text"></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    padding: 1rem;
    background-color: var(--surface-card);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.shadow {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
}
</style>
