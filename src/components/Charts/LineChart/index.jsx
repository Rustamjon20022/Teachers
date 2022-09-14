// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";

// function LineChart({ chartData, options1 }) {
//   const options = {
//     responsive: true,
//     interaction: {
//       mode: "index",
//       intersect: false,
//     },
//     //
//   };
//   return <Line data={chartData} options={options} />;
// }

// export default LineChart;
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default () => {
  const [user, setUser] = useState({
    series: [
      {
        name: "App",
        data: [50, 40, 300, 220, 500, 62, 69, 91, 148],
      },
      {
        name: "Desktops",
        data: [30, 90, 40, 140, 290, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      colors: ["red", "green"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      yaxis: {
        min: 0,
        max: 500,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });
  return (
    <ReactApexChart
      options={user.options}
      series={user.series}
      type="area"
      height={350}
    />
  );
};
