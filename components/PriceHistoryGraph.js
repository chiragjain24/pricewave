"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold">
          {format(new Date(label), 'dd MMM yyyy, HH:mm')}
        </p>
        <p className="text-blue-600 font-medium">
          Price: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const PriceHistoryGraph = ({priceHistory}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={priceHistory}>
        <XAxis
          dataKey="date"
          type="category"
          tickFormatter={(date) => format(new Date(date), 'dd MMM')}
        />
        <YAxis type="number" domain={['dataMin', 'dataMax']} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceHistoryGraph;