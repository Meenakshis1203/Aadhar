const bcrypt = require('bcrypt');
const Aadhar = require('../models/aadhar');

async function aadharPost(req, res) {
  try {
    // Generate a unique 12-digit number for the Aadhar card
    let aadharNumber = await getUniqueAadhar();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new Aadhar object with the generated Aadhar number
    const aadhar = new Aadhar({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashedPassword,
      homeAddress: req.body.homeAddress,
      aadharNumber: aadharNumber
    });

    // Save the Aadhar object to the database
    await aadhar.save();

    // Send the Aadhar object in the response
    res.status(201).json(aadhar.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getUniqueAadhar = async () => {
  let aadharNumber = '';
  let aadharExists = true;
  while (aadharExists) {
    // Generate a random 12-digit number
    aadharNumber = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');

    // Check if Aadhar number already exists in the database
    const aadhar = await Aadhar.findOne({ aadharNumber });
    aadharExists = aadhar ? true : false;
  }
  return aadharNumber;
}

module.exports = aadharPost;