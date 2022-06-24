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

const SingleTopAddys = () => {
  const [topAddys, setTopAddys] = useState([]);

  const topCategories = topAddys.map((item) => {
    return item["'TOP 5 VOTING POWER'"];
  });

  const topAddyPowers = topAddys.map((item) => {
    return item["VOTING_POWER"];
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const addyChartOptions = {
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
        text: "Percentage of Voting Power Controlled by Top Wallets",
        font: {
          size: 18,
          family: "'Maven Pro', sans-serif",
          weight: "lighter",
        },
      },
    },
  };

  const addyChartData = {
    labels: topCategories,
    datasets: [
      {
        data: topAddyPowers,
        backgroundColor: "#308d89",
        borderColor: "#308d89",
        borderWidth: 3,
        pointRadius: 2,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/d9d28055-11b9-4e87-82bb-ef0e94baaef3/data/latest"
      )
      .then((res) => {
        setTopAddys(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <div className="chart-area">
        <Line options={addyChartOptions} data={addyChartData} />
      </div>
    </div>
  );
};

export default SingleTopAddys;
