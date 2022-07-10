import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const SingleNFT = () => {
  const [nftOwners, setNftOwners] = useState([]);
  const [nftData, setNftData] = useState([]);
  const nftChartDates = nftData.map((item) => {
    return item["DAYS"];
  });
  const nftChartAmounts = nftData.map((item) => {
    return item["NET_NFT_MINTED"];
  });
  const normDates = nftChartDates.reverse();
  const normAmounts = nftChartAmounts.reverse();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const nftChartOptions = {
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
        text: "Total Chef NFT Supply",
        font: {
          size: 18,
          family: "'Maven Pro', sans-serif",
          weight: "lighter",
        },
      },
    },
  };

  const nftChartData = {
    labels: normDates,
    datasets: [
      {
        data: normAmounts,
        backgroundColor: "#308d89",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/3a925b0f-a72c-43d9-8526-f5b3e30cad88/data/latest"
      )
      .then((res) => {
        setNftOwners(res.data[0]["COUNT(DISTINCT(SIGNERS))"]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/8d970e8f-f638-4e2d-a7b1-3e38e16f76b3/data/latest"
      )
      .then((res) => {
        setNftData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <h2>Unique NFT Holders</h2>
      <div className="single-topper">
        <h3>{nftOwners} Governooors</h3>
      </div>
      <div className="chart-area">
        <Bar options={nftChartOptions} data={nftChartData} />
      </div>
    </div>
  );
};

export default SingleNFT;
