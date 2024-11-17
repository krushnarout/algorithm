const { generateReport } = require('../services/reportService');

const getReport = async (req, res) => {
  const { projectName, since } = req.params;
  const user = req.user;

  try {
    const report = await generateReport(user, projectName, since);
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getReport };
