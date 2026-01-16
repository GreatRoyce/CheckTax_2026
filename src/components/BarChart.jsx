import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";




function BarChart({chartData, chartOptions}) {
  return <div>
    <Bar data={chartData} options={chartOptions} />
  </div>;
}

export default BarChart;
