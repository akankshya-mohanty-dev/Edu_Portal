import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [state, setState] = useState({
    series: [100, 100, 100],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
              height: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          width={390}
          height={390}
        />
      </div>
    </div>
  );
};

const ProjectAnalytics = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center w-full">
      <div className="flex items-center justify-between w-full px-5">
        <h2 className="font-bold text-lg text-gray-900">Project Analytics</h2>
        
      </div>

      <div className="flex justify-center w-full">
        <ApexChart />
      </div>
    </div>
  );
};

export default ProjectAnalytics;
