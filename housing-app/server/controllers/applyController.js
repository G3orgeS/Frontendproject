const Application = require('../models/Apply');

const createApplication = async (req, res) => {
  try {
    const { user, houseselection } = req.body; // Uppdatera detta för att hämta rätt data

    const newApplication = new Application({
      user,
      houseselection,
      status: '', 
    });

    await newApplication.save();

    res.status(201).json({ message: 'Ansökan har skickats.' });
  } catch (error) {
    console.error('Fel vid skapande av ansökan:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid skickandet av ansökan.' });
  }
};


const getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.find({ user: userId });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Fel vid hämtning av användarens ansökningar:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid hämtningen av ansökningar.' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Ansökan kunde inte hittas.' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: 'Ansökans status har uppdaterats.' });
  } catch (error) {
    console.error('Fel vid uppdatering av ansökans status:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid uppdateringen av ansökans status.' });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Fel vid hämtning av alla ansökningar:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid hämtningen av alla ansökningar.' });
  }
};

module.exports = {
  updateApplicationStatus,
  getApplicationsByUser,
  createApplication,
  getAllApplications
}