import { useState, useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
const Chart = ({ data }) => {
    const chartRef = useRef(null);
    useEffect(() => {
      const chartData = Object.keys(data).map((bank) => ({
        name: bank,
        data: Object.values(data[bank]).map((rate) => rate["2023-7-17"]),
      }));
  
      const options = {
        series: chartData,
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      };
  
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
  
      return () => {
        chart.destroy();
      };
    }, [data]);
  
    return <div ref={chartRef} />;
  };
  
export default Chart;
