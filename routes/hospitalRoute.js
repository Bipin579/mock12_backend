const express = require('express');
const appointmentModel = require('../model/hospitalModel');


const hospital = express.Router();


hospital.post("/appointment", async (req, res) => {
    
    try {
        let data = new appointmentModel(req.body);
        await data.save();
        res.json({ msg: "Success", success: true });
    } catch (error) {
        res.json({ msg: "Something went wrong", success: false,error: error.message });
    }
});




hospital.get('/', async (req, res) => {
  try {
    const { specialization, sort, search, page } = req.query;
    const perPage = 4;
    const skip = (page - 1) * perPage;

    const filter = {};
    if (specialization) {
      filter.specialization = specialization;
    }
    if (search) {
      filter.name = new RegExp(search, 'i');
    }

    const sortObj = {};
    if (sort) {
      if (sort === 'asc') {
        sortObj.date = 1;
      } else if (sort === 'desc') {
        sortObj.date = -1;
      }
    }

    const appointments = await appointmentModel.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(perPage)
      .exec();

    res.json({appointments,success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error', success: false });
  }
});

module.exports =hospital;