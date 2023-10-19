const Application = require('../models/Apply');

exports.createApplication = async (req, res) => {
  try {
    const { period, userId, houseselection } = req.body;

    const newApplication = new Application({
      period,
      user: userId,
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

exports.getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.find({ user: userId });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Fel vid hämtning av användarens ansökningar:', error);
    res.status(500).json({ message: 'Ett fel inträffade vid hämtningen av ansökningar.' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
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