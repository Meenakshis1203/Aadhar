const Aadhar = require('../models/aadhar');

const aadharGet = async (req, res) => {
  try {
    const aadhar = await Aadhar.findOne({ email: req.params.email }).exec();

    if (!aadhar) {
      return res.status(404).json({ message: 'Aadhar not found' });
    }

    return res.json(aadhar);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = aadharGet;