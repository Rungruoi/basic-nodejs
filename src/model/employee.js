const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  phone: {
        type: String
  },
  address: {
        type: String
  },
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
