const express = require("express");
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = express.Router();

router.post("/", (req, res)=>{
    const reqData = req.body;

    const request = async (url)=>{
        const requestFetch = await fetch(url);
        const data = await requestFetch.json();
    
        res.json({
            data
        });
    }

    if (reqData.kind == 1) {
        const {lat, lon} = reqData;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${process.env.APIID}`;
        request(url);
    }

    if (reqData.kind == 2) {
        const city = reqData.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=${process.env.APIID}`;
        request(url);
    }
});

module.exports = router;