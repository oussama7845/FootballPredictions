<template>
  <div>
    <div v-show="show" class="background-overlay"></div>
    <div v-show="show" class="popup-container">
      <div class="popup-header">
        <p class="popup-title">C'est quoi votre prédiction ?</p>
        <svg class="close-button" @click="closePopup" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
          viewBox="0 0 24 24">
          <path fill="currentColor"
            d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
        </svg>
      </div>
      <div class="popup-content">
        <form @submit.prevent="submitPrediction">
          <div class="form-group">
            <label for="winner">Winner</label>
            <select>
              <option value="{{team1}}">{{ team1 }}</option>
              <option value="{{team2}}">{{ team2 }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="goals">Goals</label>
            <input  id="goals" type="text" v-model="goals"  required />
          </div>

          <div class="form-group">
            <label for="comment">Comment</label>
            <textarea id="comment" v-model="comment" required></textarea>
          </div>
          <button type="submit" class="submit-button">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import bus from 'vue3-eventbus';
import VueCookies from "vue-cookies";
const axios = require('axios');

export default {
  name: 'ExplorePopup',
  data() {
    return {
      show: false,
      winner: '',
      goals: '',
      comment: '',
      gameId: null,
      idUser: null,
      team1: '',
      team2: '',
    };
  },
  mounted() {
    bus.on('prediction', (gameID) => {
      this.gameId = gameID,
        this.show = true;
      this.getteams(gameID);


    });



  },
  methods: {
    closePopup() {
      this.show = false;
    },

    async getteams(gameID) {
      try {
        const response = await axios.get(`http://localhost:3000/game/${gameID}`);

        if (response) {

          this.team1 = response.data.team1;
          this.team2 = response.data.team2;
        }
      } catch (err) {
        console.log(err)
      }
    },
      // Validation des buts dans le format nombre-nombre

    validateGoals(goal) {
      const goalsPattern = /^\d+-\d+$/;
        return (goalsPattern.test(goal));

    },
      // Filtrer les caractères spéciaux qui pourraient être utilisés dans du code JavaScript
    sanitizeComment(comment) {
      const newcomment = comment.replace(/[<>]/g, '');
      return newcomment;
    },

    async submitPrediction() {

        if (!this.validateGoals(this.goals)){
          alert('Le format des buts doit être nombre-nombre, par exemple 1-0.');
          this.goals = '';
          return;

        }


      try {
        const Cookie = VueCookies.get("auth"); // je veux envoyer ce Cookie avec la requete
        console.log('cookie frontend', Cookie)
        if (Cookie) {
          this.idUser = Cookie.id;
        }
        const comment = this.sanitizeComment(this.comment);

        const response = await axios.post('http://localhost:3000/createPredictions', {
          idGame: this.gameId,
          idUser: this.idUser,
          winner: this.winner,
          goals: this.goals,
          comment: comment,
        }, {
          withCredentials: true,

        });

        console.log('Prédiction créée:', response.data);
        this.closePopup();
      } catch (error) {
        console.error('Erreur lors de la création de la prédiction:', error);
      }
    }
  }
};
</script>

<style scoped>
.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  width: 90%;
  max-width: 500px;
  box-sizing: border-box;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.popup-title {
  font-size: 20px;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
}

.close-button {
  cursor: pointer;
}

.popup-content {
  padding: 10px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #00796b;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #004d40;
}
</style>
