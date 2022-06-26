import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const SingleMain = () => {
  const [mndeLocked, setMndeLocked] = useState([]);
  const [circSupply, setCircSupply] = useState([]);
  const percentCirculating = (mndeLocked / circSupply) * 100;
  const [mndeData, setMndeData] = useState([]);

  const mndeChartDates = mndeData.map((item) => {
    return item["DAYS"];
  });
  const mndeChartAmounts = mndeData.map((item) => {
    return item["NET_MNDE_LOCKED"];
  });

  const normDates = mndeChartDates.reverse();
  const normAmounts = mndeChartAmounts.reverse();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const mndeChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Maven Pro', sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            family: "'Maven Pro', sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "",
      },
      title: {
        display: true,
        text: "Cumulative MNDE Locked Over Time",
        font: {
          size: 18,
          family: "'Maven Pro', sans-serif",
          weight: "lighter",
        },
      },
    },
  };

  const mndeChartData = {
    labels: normDates,
    datasets: [
      {
        data: normAmounts,
        backgroundColor: "#308d89",
        borderColor: "#308d89",
        pointRadius: 2,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/83e46e3d-6341-4b18-97e5-cc33cd3ff735/data/latest"
      )
      .then((res) => {
        setMndeData(res.data);
        setMndeLocked(res.data[0]["NET_MNDE_LOCKED"]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://marinade-dashboard-api-temp.herokuapp.com/mnde?circulating_supply"
      )
      .then((res) => {
        setCircSupply(res.data.mnde_circulating_supply);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <h2>MNDE Locked</h2>
      <div className="single-topper">
        <h3>
          {mndeLocked.toLocaleString()} ({percentCirculating.toFixed(2)}%)
        </h3>
      </div>
      <div className="chart-area">
        <Line options={mndeChartOptions} data={mndeChartData} />
      </div>
    </div>
  );
};

export default SingleMain;
