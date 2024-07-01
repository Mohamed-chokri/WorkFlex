const Employee = require('../models/employee'); 

exports.getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error fetching employee count:', err);
    res.status(500).json({ error: 'Failed to fetch employee count' });
  }
};


exports.getTotalSalary = async (req, res) => {
  try {
    const aggregateResult = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: '$salary' },
        },
      },
    ]);

    const totalSalary = aggregateResult.length > 0 ? aggregateResult[0].totalSalary : 0;

    res.json({ totalSalary });
  } catch (err) {
    console.error('Error fetching total salary:', err);
    res.status(500).json({ error: 'Failed to fetch total salary' });
  }
};
