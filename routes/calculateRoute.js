const express = require('express');
const authorization = require('../middleware/authMiddleware');

const calcRoute = express.Router();


calcRoute.post('/calculate', authorization, async (req, res) => {
    const { amount,rate,years } = req.body;

    const i = rate / 100;
    const n = years;
    const P = amount;
  
    const F = P * ((Math.pow((1 + i), n) - 1) / i);
  
    const totalInvestmentAmount = P * n;
    const totalInterestGained = F - totalInvestmentAmount;
  
    res.json({
        totalInvestmentAmount:totalInvestmentAmount.toFixed(0),
        totalInterestGained:totalInterestGained.toFixed(0),
        totalMaturityValue: F.toFixed(0),
    });
});

module.exports = calcRoute;