/** @format */

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import chartResData from "../../../../public/Chart.json";
import { useReducer } from "react";
import chartReducer from "./chartFunc";
import { transformDataForBarChart } from "./chartFunc";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initState = {
  chartStateData: transformDataForBarChart("revenueByProduct"),
  chartType: "bar",
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
};

function ChartType({ type, label }) {
  return (
    <div>
      <input type="radio" name="chart-type" id={type} className="mr-2"></input>
      <label htmlFor="bar-chart">{label}</label>
    </div>
  );
}

function ChartOptions({ dispatch }) {
  return (
    <div>
      {/* column type - show chart by data (product, province) */}
      <label htmlFor="column-type" className="font-bold">
        Column type
      </label>
      <select
        onChange={(e) =>
          dispatch({
            type: "CHANGE_CHART_DATA",
            payload: transformDataForBarChart(e.target.value),
          })
        }
        id="column-type"
        className="!mb-6 h-[4rem] p-2 border-[1px] border-black rounded-none focus:outline-none focus:ring-1 focus:ring-[#fc6c22]">
        <option value="revenueByProduct">Product</option>
        <option value="revenueByCategory">Category</option>
        <option value="revenueByProvince">Province/city</option>
      </select>

      {/* chart type - bar/pie */}
      <p className="font-bold mb-1">Chart type</p>

      <ChartType label="Bar chart" type="bar-chart"></ChartType>
      <ChartType label="Pie chart" type="pie-chart"></ChartType>
    </div>
  );
}

export default function BarChart() {
  // const data = transformDataForBarChart(initState.chart);
  const [chartState, dispatch] = useReducer(chartReducer, initState);

  return (
    <div className="flex-1 self-center m-4">
      <h1 className="text-center mb-3">Revenue statistics</h1>
      <div className="flex gap-14 h-[45rem] max-w-[80rem] ">
        <ChartOptions dispatch={dispatch}></ChartOptions>
        <Bar data={chartState.chartStateData} options={options} />
      </div>
    </div>
  );
}
