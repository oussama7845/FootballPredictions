<template>
    <div class="container">
      <div class="section section-games">
        <h2>Les prochains matchs</h2>
        <div class="card-container">
          <div v-for="(game, index) in games" :key="index" class="card">
            <img src="../../assets/logo.png" alt="Game Image">
            <p>{{ game.team1 }}</p>
            <p>{{ game.team2 }}</p>
            <p>{{ formatDateTime(game.date) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'HomeComponent-sec2',
    data() {
      return {
        games: [],
      };
    },
    mounted() {
      this.getAllGames();
    },
    methods: {
      async getAllGames() {
        try {
          const { data: fetchedGames } = await axios.get('http://localhost:3000/games');
          this.games = fetchedGames.slice(0, 6).map(game => ({
            team1: game.team1,
            team2: game.team2,
            date: game.date,
          }));
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      },

      formatDateTime(dateTimeString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZoneName: 'short'
      };
      return new Date(dateTimeString).toLocaleDateString('fr-FR', options);
    }
    },
  };
  </script>
  
  <style scoped>
  .container {
    width: 90%;
    margin: auto;
  }
  
  .section {
    margin: 20px 0;
  }
  
  .section-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 3%;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
  
  .text-content {
    flex: 1;
    padding: 20px;
  }
  
  .image-content img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .section-games {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 200px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .card img {
    width: 50%;
    height: auto;
    margin-bottom: 10px;
  }
  
  .card p {
    margin: 5px 0;
    font-weight: 600;
  }
  </style>
  