// Simple report controller returning mock data as defined by the spec docs to keep DB complexity low
const getGpaByYear = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: [
      { year: 'Year 1', gpa: 3.4 },
      { year: 'Year 2', gpa: 3.1 },
      { year: 'Year 3', gpa: 3.3 },
      { year: 'Year 4', gpa: 3.0 }
    ]
  });
};

const getGpaDistribution = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      'Excellent (≥3.7)': 42,
      'Good (3-3.7)': 138,
      'Average (2.5-3)': 50,
      'At Risk (<2.5)': 18
    }
  });
};

const getPassRates = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: [
      { module: 'SE', passRate: 94 },
      { module: 'IntroProg', passRate: 91 },
      { module: 'OOP', passRate: 88 },
      { module: 'DBMS', passRate: 85 },
      { module: 'Networks', passRate: 62 },
    ]
  });
};

module.exports = { getGpaByYear, getGpaDistribution, getPassRates };
