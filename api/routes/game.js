let express = require('express');
let router = express.Router();
let path = require('path');
const fs = require('fs'); 

const gamesFilePath = path.join(__dirname, '../data/games.json');
const games = JSON.parse(fs.readFileSync(gamesFilePath, 'utf8'));



// Route pour récupérer tous les matchs
router.get('/games', (req, res) => {
    return res.status(200).json(games)
    });
    
    // Route pour récupérer un match par ID
    router.get('/game/:id', (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const game = games.find(g => g.id === gameId);
    
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
    });
    


module.exports = router;
