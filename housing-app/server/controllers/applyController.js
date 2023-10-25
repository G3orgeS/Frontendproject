const Application = require('../models/Apply');

const createApplication = async (req, res) => {
  try {
    const { user, houseselection } = req.body;

    console.log('Mottagen användardata:', user);
    console.log('Mottagen houseselection-data:', houseselection);

    if (!Array.isArray(houseselection)) {
      console.log('Houseselection är inte en array:', houseselection);
      return res.status(400).json({ message: 'Houseselection måste vara en array.' });
    }

    const newApplication = new Application({
      user,
      houseselection,
    });

    console.log('Ny ansökan som skapas:', newApplication);

    await newApplication.save();

    console.log('Ansökan sparades utan problem.');

    res.status(201).json({ message: 'Ansökan har skickats.' });
  } catch (error) {
    console.error('Fel vid skapande av ansökan:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid skickandet av ansökan.' });
  }
};


const getApplicationsByUser = async (req, res) => {
  try {
    const { username } = req.params;

    const applications = await Application.find({ user: username });

    if (applications && applications.length > 0) {
      const houseselections = applications.flatMap(application => application.houseselection);
      res.status(200).json(houseselections);
    } else {
      res.status(200).json([]);
    }
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