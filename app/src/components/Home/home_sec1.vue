<template>
    <div class="container">
      <div class="section section-info">
        <div class="text-content">
          <h1>C'est quoi FootPredict</h1>
          <p>
            FootPredict est la plateforme ultime pour les passionnés de football qui cherchent à prédire avec
            précision les résultats de leurs matchs préférés. Notre mission est de vous fournir des analyses
            détaillées, des statistiques précises et des prédictions fiables pour vous aider à rester en tête du
            jeu. Que vous soyez un parieur expérimenté, un amateur de football, ou simplement curieux des
            résultats, FootPredict est votre compagnon idéal.
          </p>
        </div>
        <div class="image-content">
          <img src="../../assets/home_footbal_image.png" alt="Football Image">
        </div>
      </div>
  
  
    </div>
  </template>
  
  <script>

  
  export default {
    name: 'HomeComponent-sec1',
    data() {
      return {

      };
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
  
 </style>