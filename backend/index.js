const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const loginPost = require("./services/login");
const aadharPost = require("./services/aadhar-post");
const aadharGet = require("./services/aadhar-get");
const Aadhar = require('./models/aadhar');

const createAdminUserIfNotExists = async () => {
  const adminUser = await Aadhar.findOne({ email: "admin" });
  if (!adminUser) {
    const password = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10) 
    const adminUserData = {
      email: 'admin',
      password: hashedPassword,
      firstName: "admin",
      lastName: "admin",
      phoneNumber: "9876543215",
      homeAddress: "admin house, place, pincode",
      aadharNumber: "123456789123"
    };
    const adminUser = new Aadhar(adminUserData);
    await adminUser.save();
    console.log(`Created admin user: ${adminUser.email} with password: ${password}`);
  }
};

// Set connection to mongo db
const mongoURI = 'mongodb://127.0.0.1:27017/aadhar';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error(err);
  });
  createAdminUserIfNotExists();
// Use body-parser middleware to parse incoming requests
app.use(bodyParser.json());
app.use(cors());

app.post('/login', loginPost);
app.post('/aadhar', aadharPost);
app.get('/aadhar/:email', aadharGet);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});