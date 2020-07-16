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
  avatar: {
    type: String
  },
  address: {
        type: String
  },
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
