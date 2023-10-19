const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

const connectToDatabase = async () => {
  try {
    await client.connect();
    database = client.db('studystayDB');
  } catch (error) {
    console.error('Något gick fel vid anslutning till databasen:', error);
    throw error;
  }
};

module.exports = {
  connectToDatabase,
  getDatabase: () => database,
};
