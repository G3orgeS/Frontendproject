const express = require('express');
const cors = require('cors');
const houseRoutes = require('./routes/houseRoutes'); // Importera dina house-routes

const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://GS:BytMig123@cluster0.9csxogu.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
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

app.use('/api/house', houseRoutes);

app.listen(port, () => {
  console.log(`Server lyssnar på port ${port}`);
});
