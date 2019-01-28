const express = require('express');
const cake = express.Router();
const connection = require('../helper/db.js');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const jwtAuthentification = require('../helper/passport_strategies');

cake.use(bodyParser.urlencoded({ extend: true }));
cake.use(bodyParser.json());

// Enregistrement d'un nouveau cake - OK
cake.post(`/cakes/new`, (req, res) => {
  connection.query('INSERT INTO final_cakes SET ?', req.body, (err, results) => {
    if (err) res.status(500).send("Erreur lors de l'ajout du gâteau'");
    else res.status(200).json({ id: results.insertId });
  });
});

// Mise à jour d'un cake existant - OK
cake.put(`/cakes/:id`, (req, res) => {
  connection.query('UPDATE final_cakes SET ? WHERE id=?',
    [req.body, req.params.id],
    (err, results) => {
      if (err) res.status(500).send("Erreur lors de la mise à jour du gâteau");
      else res.status(200).send("Gâteau mis à jour");
    }
  );
});

// Récupération de tous les gâteaux & leurs ingrédients
cake.get(`/cakes/all`, (req, res) => {
  connection.query(`
    SELECT cake.*, group_concat(' ', ingredients.type, ' ', ingredients.name) as ingredients,
    cw.deco1, cw.deco2, cw.photo1, cw.photo2, cw.msgContent, cw.msgColor, cw.msgBgColor, cw.msgFont, cw.description3D
    FROM final_cakes AS cake
    INNER JOIN custom_wishes as cw
    ON cake.customWishes = cw.id
    INNER JOIN jt_cake_ingredients as junctionTable
    ON cake.id = junctionTable.id_final_cake
    INNER JOIN ingredients as ingredients
    ON junctionTable.id_ingred = ingredients.id
    GROUP BY cake.id`, (err, results) => {
    if (err) res.status(500).send("Erreur lors de la récupération de la liste de gâteaux");
    else res.status(200).json(results);
  });
});

module.exports = cake;