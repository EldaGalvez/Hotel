import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/clientes/listac',
                    name: 'listac',
                    component: () => import('@/views/pages/clientes/Listac.vue')
                },
                {
                    path: '/reserva/reservacion',
                    name: 'reservacion',
                    component: () => import('@/views/pages/reserva/reservacion.vue')
                },
                {
                    path: '/reserva/listare',
                    name: 'listare',
                    component: () => import('@/views/pages/reserva/listare.vue')
                },
                {
                    path: '/reserva/cancelacionre',
                    name: 'cancelacionre',
                    component: () => import('@/views/pages/reserva/cancelacionre.vue')
                },
                {
                    path: '/estancia/llegada',
                    name: 'llegada',
                    component: () => import('@/views/pages/estancia/Llegada.vue')
                },
                {
                    path: '/estancia/salida',
                    name: 'salida',
                    component: () => import('@/views/pages/estancia/Salida.vue')
                },
                {
                    path: '/estancia/consumo',
                    name: 'consumo',
                    component: () => import('@/views/pages/estancia/Consumo.vue')
                },
                {
                    path: '/estancia/estancia',
                    name: 'estancia',
                    component: () => import('@/views/pages/estancia/Estancia.vue')
                },
                {
                    path: '/facturacion/facturas',
                    name: 'facturas',
                    component: () => import('@/views/pages/facturacion/Facturas.vue')
                },
                {
                    path: '/facturacion/historial',
                    name: 'historial',
                    component: () => import('@/views/pages/facturacion/Historial.vue')
                },
                {
                    path: '/reportes/clientes',
                    name: 'reporte',
                    component: () => import('@/views/pages/reportes/Clientes.vue')
                },
                {
                    path: '/reportes/reservaciones',
                    name: 'reservaciones',
                    component: () => import('@/views/pages/reportes/Reservaciones.vue')
                },
                {
                    path: '/reportes/cancelaciones',
                    name: 'cancelaciones',
                    component: () => import('@/views/pages/reportes/Cancelaciones.vue')
                },
                
                {
                    path: '/reportes/ingresos',
                    name: 'ingresos',
                    component: () => import('@/views/pages/reportes/Ingresos.vue')
                },
                {
                    path: '/reportes/serviciosr',
                    name: 'serviciosr',
                    component: () => import('@/views/pages/reportes/Serviciosr.vue')
                },
                {
                    path: '/reportes/habitaciones',
                    name: 'habitaciones',
                    component: () => import('@/views/pages/reportes/Habitaciones.vue')
                }
            ]
        }
        
    ]
});

export default router;
