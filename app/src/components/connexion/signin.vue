<template>
    <div class="auth-container">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email"  />
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" v-model="password"  />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  const axios = require('axios');
  import Cookie from "js-cookie";

  export default {
    name: 'Login-Component',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try{
          let body ={
            email : this.email,
            password : this.password,
          }

          const response = await axios.post('http://localhost:3000/login', body)
          if (response.status === 404){ 
            console.log('User introuvable')
          }else if( response.status === 403){
            console.log('mot de passe incorrect')
          }else if( response.status === 200){
            Cookie.set("auth", JSON.stringify(response.data));

            this.$router.push('/userHome')
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
  