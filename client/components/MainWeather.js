import React, { useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import axios from 'axios';
import Chart from './Chart';

export default function Main() {
  const [lat, setLat] = React.useState('40');
  const [long, setLong] = React.useState('-70');
  const [chartData, setChartData] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

  const handleLatChange = (event) => {
    setLat(event.target.value);
  };

  useEffect(() => {
    submitPage();
  }, [checked]);

  const handleLongChange = (event) => {
    setLong(event.target.value);
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  const submitPage = async () => {
    if (checked) {
      const { data } = await axios.get(`/api/weather/precip/${lat}/${long}`);
      console.log(data);
      formatData(data);
    } else {
      const { data } = await axios.get(`/api/weather/${lat}/${long}`);
      console.log(data);
      formatData(data);
    }
  };

  const formatData = (data) => {
    let dataArray = data.hourly.temperature_2m.map((temp, idx) => {
      return checked
        ? {
            temp: temp,
            time: new Date(data.hourly.time[idx]).toUTCString(),
            precipitation: data.hourly.precipitation[idx],
          }
        : { temp: temp, time: new Date(data.hourly.time[idx]).toUTCString() };
    });
    setChartData(dataArray);
  };

  return (
    <div
      style={{
        maxHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden',
      }}
    >
      <Paper
        elevation={3}
        style={{
          display: 'flex',
          justifyContent: 'flexStart',
          height: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', backgroundColor: 'lightskyblue' }}>
          <Typography variant="h5" style={{ margin: '20px' }}>
            Welcome to the AWP Weather forecast!
          </Typography>
        </div>
        <h3>Please enter a latitude and longitude to check the weather!</h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '70%',
          }}
        >
          <TextField
            id="outlined-lat"
            label="Latitude"
            value={lat}
            onChange={handleLatChange}
          />
          <TextField
            id="outlined-long"
            label="longitude"
            value={long}
            onChange={handleLongChange}
          />

          <Button variant="contained" onClick={submitPage}>
            Get the weather report!
          </Button>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              checked={checked}
              onChange={handleCheck}
              label={<Typography variant="h6">Precipitation</Typography>}
            />
          </FormGroup>
        </div>
        <Chart chartData={chartData} precipitation={checked} />
      </Paper>
    </div>
  );
}
