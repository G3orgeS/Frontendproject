const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Importera cors-paketet

const app = express();
const port = 3000;

const uri = 'mongodb+srv://GS:BytMig123@cluster0.9csxogu.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Använd CORS-middleware före dina befintliga routes
app.use(cors());

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

    // Lägg till en ny GET-rout för att hämta husdata
    app.get('/api/house', (req, res) => {
      // Skicka husdata som JSON
      res.json(houses);
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
