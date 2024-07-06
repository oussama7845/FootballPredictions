<template>
    <div class="auth-container">
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <div>
          <label for="firstname">firstname:</label>
          <input id="firstname" type="text" v-model="firstname" />
        </div>
        <div>
          <label for="lastname">lastname:</label>
          <input id="lastname" type="text" v-model="lastname" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" />
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" v-model="password" />
        </div>
        <button @click.prevent=(register)>S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  const axios = require('axios');
  export default {
    name: 'Register-Component',
    data() {
      return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try{
          let body ={
            firstname : this.firstname,
            lastname : this.lastname,
            email : this.email,
            password : this.password,
          }

          const response = await axios.post('http://localhost:3000/createUser', body)
          if (response.status === 200){ 
            console.log('votre compte est créer')
            this.$router.push('/signin');
          }else if (response.status === 400 ){
            alert('format d email ou mot de passe invalide')
          }else if(response.status === 405){
            alert('Email déjà utilisé')
          }
          else{
            console.log('une erreur est survenue lors de la création de votre compte.')

          }



        }catch(err){
          console.log(err)
        }


      },
    },
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  .auth-container h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .auth-container form {
    display: flex;
    flex-direction: column;
  }
  
  .auth-container label {
    margin-bottom: 5px;
  }
  
  .auth-container input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .auth-container button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #00796b;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .auth-container button:hover {
    background-color: #004d40;
  }
  </style>
  