const mongoose = require('mongoose');

const timeOffSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: String, required: true },
  dates: { type: [Date], required: true },
});

module.exports = mongoose.model('TimeOff', timeOffSchema);
