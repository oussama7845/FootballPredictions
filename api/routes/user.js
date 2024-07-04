let express = require('express');
let router = express.Router();
const fs = require('fs'); 
let User = require('../models').User;
const { v4: uuidv4 } = require('uuid');
let bcrypt   = require('bcryptjs');
let jwt = require("jsonwebtoken");
let path = require('path');
let env = process.env.NODE_ENV || "development";
let config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
require("dotenv").config();
const gamesFilePath = path.join(__dirname, '../data/games.json');
const games = JSON.parse(fs.readFileSync(gamesFilePath, 'utf8'));
const passwordValidator = require('password-validator');
const schema = new passwordValidator();

schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();

// Get All users
router.get('/users', function (req, res) {
  User.findAll().then(users => {
    return res.status(200).json(users); 
  }).catch(err => {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while fetching users.' });
  });
});


router.post('/createUser', function (req, res) {
  const { firstname, lastname, email, password } = req.body;

  const newUser = new User({
    firstname,
    lastname,
    email,
    password,
    isAdmin: true,
    securityToken:uuidv4(),
  });

  newUser
    .save()
    .then((createUser) => {
      res.status(200).json(createUser);

    })
    .catch(err => {
      console.log('erreur  :', err)
    })

});

// Login authentification
router.post('/login',async function (req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json('user introuvable');
    }

    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
      if (err)
        return res.status(500).json('Erreur est survenue lors de la vérification du mot de passe');
      if (!isMatch) {
        return res.status(403).json('Mot de passe incorrect');
      }

      let token = jwt.sign(
        {
          exp: Math.floor(Date.now() + 60 * 1000 * 60 * 876000),
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          isAdmin:user.isAdmin,
        },
        config.privateKey
      );

      return res.status(200).json({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        isAdmin:user.isAdmin,
        token: token,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json('Une erreur est survenue lors de la recherche de l\'user');
}});








module.exports = router;
