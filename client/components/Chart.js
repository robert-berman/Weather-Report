import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';
const Chart = ({ chartData, precipitation }) => {
  return (
    <LineChart
      width={1250}
      height={600}
      data={chartData}
      margin={{
        top: 25,
        bottom: 35,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis yAxisId="temp">
        <Label
          value={'Temperature'}
          angle={-90}
          position="outside"
          fill="#676767"
          fontSize={14}
          dx={-10}
        />
      </YAxis>
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="temp"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        strokeWidth={3}
        yAxisId="temp"
        dot={false}
      />
      {precipitation && (
        <>
          <YAxis yAxisId="precip">
            <Label
              value={'Precipitation'}
              angle={-90}
              position="outside"
              fill="#676767"
              fontSize={14}
              dx={-10}
            />
          </YAxis>
          <Line
            type="monotone"
            dataKey="precipitation"
            stroke="#71a4c1"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            yAxisId="precip"
            dot={false}
          />
        </>
      )}
    </LineChart>
  );
};

export default Chart;
