<template>
    <div class="section-auth">
      <h2>Rejoignez FootPredict Aujourd'hui</h2>
      <p>Inscrivez-vous ou connectez-vous pour accéder à toutes nos fonctionnalités exclusives.</p>
      <button @click="register">S'inscrire</button>
      <button @click="login">Se connecter</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthSection-component',
    methods: {
      register() {
        this.$router.push("/signup")

      },
      login() {

        this.$router.push("/signin")

      }
    }
  };
  </script>
  
  <style scoped>
  .section-auth {
    color: white;
    text-align: center;
    background-color: #415a77;
    padding: 20px;
  }
  
  .section-auth h2 {
    margin-bottom: 10px;
  }
  
  .section-auth p {
    margin-bottom: 20px;
  }
  
  .section-auth button {
    margin: 5px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: #0d1b2a;
    color: white;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .section-auth button:hover {
    background-color: #004d40;
  }
  </style>
  