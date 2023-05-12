const mongoose = require('mongoose');

const aadharSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  homeAddress: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true }
});

aadharSchema.set('toJSON', {
  transform: (doc, ret) => {
    // Remove _id and __v fields from the response
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

module.exports = mongoose.model('Aadhar', aadharSchema);
