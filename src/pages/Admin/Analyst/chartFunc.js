/** @format */
import chartResData from "../../../../public/Chart.json";

export function transformDataForBarChart(columnType) {
  const data = chartResData[columnType]; // get data by column type

  // get column title
  const titleMap = {
    revenueByProduct: "title",
    revenueByCategory: "categoryName",
    revenueByProvince: "province",
  };

  const title = titleMap[columnType] || "unknown"; // Default to "unknown" if columnType is not found

  return {
    labels: data.map((item) => item[title]), // Product names as labels
    datasets: [
      {
        label: "Quantity Sold",
        data: data.map((item) => item.quantitySold), // Sold quantity as data points
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Revenue",
        data: data.map((item) => item.revenue), // Revenue as data points
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
}

function chartReducer(state, action) {
  switch (action.type) {
    case "CHANGE_CHART_DATA":
      return { ...state, chartStateData: action.payload };

    case "CHANGE_CHART_TYPE":
      return { ...state, chartType: action.payload };

    default:
      return state;
  }
}

export default chartReducer;
