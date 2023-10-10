const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config(); 
const houseRoutes = require('./routes/houseRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Ansluten till MongoDB');
})
.catch(err => {
  console.error('Fel vid anslutning till MongoDB:', err);
});

app.use('/api/house', houseRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server lyssnar på port ${port}`);
});

