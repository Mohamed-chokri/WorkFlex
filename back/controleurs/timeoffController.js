const TimeOff = require('../models/timeoff');

exports.grantTimeOff = async (req, res) => {
  try {
    const { employeeId, leaveType, dates } = req.body;
    const newTimeOff = new TimeOff({
      employee: employeeId,
      leaveType,
      dates,
    });
    await newTimeOff.save();
    res.status(201).json({ message: 'Time off granted successfully' });
  } catch (error) {
    console.error('Error granting time off:', error);
    res.status(500).json({ error: 'Failed to grant time off' });
  }
};

exports.getTimeOff = async (req, res) => {
  try {
    const timeOff = await TimeOff.find().populate('employee');
    const filteredTimeOff = timeOff.filter(record => record.employee);
    res.status(200).json(filteredTimeOff);
  } catch (error) {
    console.error('Error fetching time off:', error);
    res.status(500).json({ error: 'Failed to fetch time off' });
  }
};