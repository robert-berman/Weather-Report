const axios = require('axios');
const router = require('express').Router();

router.get('/:lat/:long', async (req, res, next) => {
  try {
    const weatherReport = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${req.params.lat}&longitude=${req.params.long}&hourly=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
    );
    res.json(weatherReport.data);
  } catch (err) {
    next(err);
  }
});

router.get('/precip/:lat/:long/', async (req, res, next) => {
  try {
    const weatherReport = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${req.params.lat}&longitude=${req.params.long}&hourly=temperature_2m,precipitation&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York`
    );
    res.json(weatherReport.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
