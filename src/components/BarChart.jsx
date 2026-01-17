import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChart({ chartData, chartOptions }) {
  return (
    <div className="w-full h-full">
      {/* <h5 className="text-center text-primary pb-10">Tax Revenue Projection(2025 vs 2026)</h5> */}
      <Bar
        data={chartData}
        options={chartOptions}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default BarChart;
