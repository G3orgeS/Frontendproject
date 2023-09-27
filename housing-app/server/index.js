const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://GS:BytMig123@cluster0.9csxogu.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await client.connect();
    const database = client.db('studystayDB');
    
    const houseCollection = database.collection('house');
    const houses = await houseCollection.find({}).toArray();
    res.locals.houses = houses;

    const usersCollection = database.collection('users');
    const users = await usersCollection.find({}).toArray();
    res.locals.users = users;

    app.get('/api/house', (req, res) => {
      res.json(houses);
    });

    app.post('/api/house', async (req, res) => {
      try {
        const formData = req.body;
        const result = await houseCollection.insertOne(formData);
        res.status(201).json({ message: 'Huset har lagts till i databasen', insertedId: result.insertedId });
      } catch (error) {
        console.error('Något gick fel vid läggning till hus:', error);
        res.status(500).json({ error: 'Något gick fel på servern' });
      }
    });

  } catch (error) {
    console.error('Något gick fel:', error);
  } finally {
    next();
  }
});

app.get('/', (req, res) => {
  const houses = res.locals.houses;
  const users = res.locals.users;
  
  res.send(`Hus data: ${JSON.stringify(houses)}\nAnvändar data: ${JSON.stringify(users)}`);
});

app.listen(port, () => {
  console.log(`Server lyssnar på port ${port}`);
});
