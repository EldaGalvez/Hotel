<!-- src/views/TipoHabView.vue -->
<template>
    <div class="tipo-hab-container">
      <h1 class="form-title">Registro de Tipo de Habitación</h1>
      <form @submit.prevent="registerTipoHab" class="tipo-hab-form">
        <label for="descHab">Descripción:</label>
        <input type="text" v-model="tipoHab.descHab" id="descHab" required />
  
        <label for="cantCamas">Cantidad de Camas:</label>
        <input type="number" v-model="tipoHab.cantCamas" id="cantCamas" required />
  
        <label for="cantPersonas">Cantidad de Personas:</label>
        <input type="number" v-model="tipoHab.cantPersonas" id="cantPersonas" required />
  
        <label for="precioHab">Precio por Noche:</label>
        <input type="number" v-model="tipoHab.precioHab" id="precioHab" step="0.01" required />
  
        <button type="submit" class="register-button">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const tipoHab = ref({
        descHab: '',
        cantCamas: 0,
        cantPersonas: 0,
        precioHab: 0.0
      });
  
      const registerTipoHab = () => {
        alert('Registro de tipo de habitación exitoso');
      };
  
      return { tipoHab, registerTipoHab };
    }
  };
  </script>
  
  <style scoped>
  .tipo-hab-container {
    background-image: url('@/assets/habitacion.jpg');
    background-size: cover;
    background-position: center;
    padding: 2em;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
  
  .form-title {
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1em;
    color: white;
  }
  
  .tipo-hab-form {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1em;
    border-radius: 10px;
    width: 600px;
  }
  
  label, input {
    margin: 0.5em 0;
  }
  
  .register-button {
    background-color: #808080;
    border-radius: 15px;
    font-weight: bold;
    width: 50%;
    font-size: 1.2em;
    height: 50px;
    border: none;
    color: #fff;
    cursor: pointer;
    margin: 1em auto 0;
  }
  </style>
  