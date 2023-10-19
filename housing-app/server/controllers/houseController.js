const { ObjectId } = require('mongodb');

const getAllHouses = async (req, res) => {
    try {
      const houseCollection = res.locals.houseCollection;
      const houses = await houseCollection.find({}).toArray();
      res.json(houses);
    } catch (error) {
      console.error('Något gick fel vid hämtning av hus:', error);
      res.status(500).json({ error: 'Något gick fel på servern' });
    }
  };
  
const createHouse = async (req, res) => {
    try {
      const houseCollection = res.locals.houseCollection;
      const formData = req.body;
      const result = await houseCollection.insertOne(formData);
      res.status(201).json({ message: 'Huset har lagts till i databasen', insertedId: result.insertedId });
    } catch (error) {
      console.error('Något gick fel vid läggning till hus:', error);
      res.status(500).json({ error: 'Något gick fel på servern' });
    }
  };
  
const updateHouse = async (req, res) => {
    try {
      const houseCollection = res.locals.houseCollection;
      const { id } = req.params;
      const updatedData = req.body;
      const result = await houseCollection.updateOne({ _id: id }, { $set: updatedData });
      res.json({ message: 'Huset har uppdaterats', modifiedCount: result.modifiedCount });
    } catch (error) {
      console.error('Något gick fel vid uppdatering av hus:', error);
      res.status(500).json({ error: 'Något gick fel på servern' });
    }
  };
  
const deleteHouse = async (req, res) => {
    try {
      const houseCollection = res.locals.houseCollection;
      const { id } = req.params;
      const result = await houseCollection.deleteOne({ _id: id });
      res.json({ message: 'Huset har tagits bort', deletedCount: result.deletedCount });
    } catch (error) {
      console.error('Något gick fel vid borttagning av hus:', error);
      res.status(500).json({ error: 'Något gick fel på servern' });
    }
  };

const getHouseById = async (req, res) => {
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
  };

module.exports = {
    getAllHouses,
    createHouse,
    updateHouse,
    deleteHouse,
    getHouseById,
  };