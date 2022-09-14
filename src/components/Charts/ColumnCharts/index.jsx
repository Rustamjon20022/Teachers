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
        name: "Inflation",
        data: [350, 200, 300, 140, 260, 300, 50, 250, 150],
      },
    ],
    options: {
      chart: {
        type: "bar",
        borderRadius: 10,
      },
      plotOptions: {
        bar: {
          borderRadius: 15,
        },
      },
      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      colors: ["#000"],

      yaxis: {
        min: 0,
        max: 400,
      },
    },
  });
  return (
    <ReactApexChart
      options={user.options}
      series={user.series}
      type="bar"
      width={"90%"}
      height={250}
      dark
    />
  );
};
