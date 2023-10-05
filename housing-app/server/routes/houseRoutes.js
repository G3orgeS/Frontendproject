const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');


// Anslutning till MongoDB
const uri = 'mongodb+srv://GS:BytMig123@cluster0.9csxogu.mongodb.net/test';
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

// Hämta alla hus
router.get('/', async (req, res) => {
  try {
    const houseCollection = res.locals.houseCollection;
    const houses = await houseCollection.find({}).toArray();
    res.json(houses);
  } catch (error) {
    console.error('Något gick fel vid hämtning av hus:', error);
    res.status(500).json({ error: 'Något gick fel på servern' });
  }
});

// Hämta ett enskilt hus baserat på ID
router.get('/:id', async (req, res) => {
  try {
    const houseCollection = res.locals.houseCollection;
    const { id } = req.params;

    const objectId = new ObjectId(id);

    const house = await houseCollection.findOne({ _id: objectId });

    if (!house) {
      return res.status(404).json({ error: 'Huset kunde inte hittas' });
    }

    res.json(house);
  } catch (error) {
    console.error('Något gick fel vid hämtning av hus:', error);
    res.status(500).json({ error: 'Något gick fel på servern' });
  }
});

// Skapa ett nytt hus
router.post('/', async (req, res) => {
  try {
    const houseCollection = res.locals.houseCollection;
    const formData = req.body;
    const result = await houseCollection.insertOne(formData);
    res.status(201).json({ message: 'Huset har lagts till i databasen', insertedId: result.insertedId });
  } catch (error) {
    console.error('Något gick fel vid läggning till hus:', error);
    res.status(500).json({ error: 'Något gick fel på servern' });
  }
});

module.exports = router;
