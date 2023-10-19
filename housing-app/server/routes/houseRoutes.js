const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const { MongoClient } = require('mongodb');
require('dotenv').config(); 

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.use(async (req, res, next) => {
  try {
    await client.connect();
    const database = client.db('studystayDB');
    const houseCollection = database.collection('house');
    res.locals.houseCollection = houseCollection;
  } catch (error) {
    console.error('Något gick fel vid anslutning till databasen:', error);
    res.status(500).json({ error: 'Något gick fel på servern' });
  } finally {
    next();
  }
});

router.get('/', houseController.getAllHouses);
router.post('/', houseController.createHouse);
router.put('/:id', houseController.updateHouse);
router.delete('/:id', houseController.deleteHouse);
router.get('/:id', houseController.getHouseById);


module.exports = router;