<template>
  <div class="predictions-container">
    <button @click="filterPredictions('today')">Aujourd'hui</button>
    <button @click="filterPredictions('last_week')">Semaine dernière</button>
    <button @click="filterPredictions('all')">Tout</button>

    <div class="prediction-cards">
      <div v-for="prediction in predictions" :key="prediction.id" class="card">
        <div class="card-header">
          <h3><span class="team-name">{{ prediction.team1 }}</span> vs <span class="team-name">{{ prediction.team2
              }}</span></h3>
          <p> <span style="color: black;">Gagnant:</span> {{ prediction.winner }} - {{ prediction.goal }}</p>
          <p><span style="color: black;">Date:</span> {{ formatDateTime(prediction.createdAt) }}</p>
        </div>
        <div class="card-body">
          <p>Commentaire : {{ prediction.comment }}</p>
        </div>
        <button class="delete-button" @click="deletePrediction(prediction.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M15 18v-2h4v2zm0-8V8h7v2zm0 4v-2h6v2zM3 8H2V6h4V4.5h4V6h4v2h-1v9q0 .825-.587 1.413T11 19H5q-.825 0-1.412-.587T3 17z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>



<script>
import VueCookies from "vue-cookies";
import axios from "axios";

export default {
  name: 'mypredictions-component',
  data() {
    return {
      idUser: null,
      predictions: [],

    }
  },
  mounted() {
    const Cookie = VueCookies.get("auth");
    if (Cookie) {
      this.idUser = Cookie.id;
      this.fetchPredictions();
    }
  },
  methods: {
    async deletePrediction(predictionId) {
      try {
        const response = await axios.delete(`http://localhost:3000/predictions/${predictionId}`, {
          withCredentials: true,

        });
        if (response.status === 200) {
          // Supprimer localement la prédiction de this.predictions
          this.predictions = this.predictions.filter(prediction => prediction.id !== predictionId);
          console.log('Prediction deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting prediction:', error);
      }
    },

    async fetchPredictions() {
      try {
        const response = await axios.get(`http://localhost:3000/predictions/${this.idUser}`, {
          withCredentials: true,

        });
        this.predictions = response.data;

        await this.fetchMatchDetails();
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    },
    async fetchMatchDetails() {
      try {

        const response = await axios.get('http://localhost:3000/games');
        const allGames = response.data;


        this.predictions.forEach(prediction => {
          const gameDetails = allGames.find(game => game.id === prediction.idGame);
          console.log(gameDetails)
          if (gameDetails) {
            prediction.team1 = gameDetails.team1;
            prediction.team2 = gameDetails.team2;
          }
        });


      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    },

    filterPredictions() {
      // à faire
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
    },

  }
}
</script>
<style lang="scss" scoped>
.predictions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
margin-bottom: 15%;
}

.prediction-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.card-header h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.card-header .team-name {
  font-weight: bold;
}

.card-header p {
  font-size: 0.9rem;
  color: #777;
}

.card-body p {
  margin-bottom: 10px;
  line-height: 1.4;
}

.delete-button{
  border: none;
  background-color: transparent
}
</style>
