import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

const Double = () => {
  const [voterDistribution, setVoterDistribution] = useState([]);
  const [participation, setParticipation] = useState([]);

  const distChartLevels = voterDistribution.map((item) => {
    return item["LEVELS"];
  });
  const distChartWallets = voterDistribution.map((item) => {
    return item["NUMBER_OF_WALLETS"];
  });
  const partChartWallets = participation.map((item) => {
    return item["HOLDERS_VOTERS"];
  });
  const partChartStatus = participation.map((item) => {
    return item["VOTING_STATUS"];
  });

  const distChartData = {
    labels: distChartLevels,
    datasets: [
      {
        label: "# of Voters",
        data: distChartWallets,
        backgroundColor: [
          "#27a17a",
          "#c8ece0",
          "#d1c8b6",
          "#e76d48",
          "#308d89",
        ],
        borderColor: ["#4b423f"],
        borderWidth: 1.5,
      },
    ],
  };

  const distChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 11,
            family: "'Maven Pro', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Voter Power Distribution",
        font: {
          size: 18,
          family: "'Maven Pro', sans-serif",
          weight: "lighter",
        },
      },
    },
  };

  const partChartData = {
    labels: partChartStatus,
    datasets: [
      {
        label: "# of Wallets",
        data: partChartWallets,
        backgroundColor: ["#e76d48", "#308d89"],
        borderColor: ["#4b423f"],
        borderWidth: 1.5,
      },
    ],
  };

  const partChartOptions = {
    responsive: true,
    layout: {
      padding: {
        bottom: 20,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 14,
            family: "'Maven Pro', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Aggregate Voter Participation (Current NFT Holders)",
        font: {
          size: 18,
          family: "'Maven Pro', sans-serif",
          weight: "lighter",
        },
      },
    },
  };

  ChartJS.register(ArcElement, Title, Tooltip, Legend);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/90a54a96-8403-42b4-8afd-cdec8eaba77b/data/latest"
      )
      .then((res) => {
        setVoterDistribution(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/e240c1c7-71a0-4478-8f97-55ace91dbbce/data/latest"
      )
      .then((res) => {
        setParticipation(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="double">
      <div className="small-chart-area">
        <Pie options={distChartOptions} data={distChartData} />
      </div>
      <div className="small-chart-area">
        <Doughnut options={partChartOptions} data={partChartData} />
      </div>
    </div>
  );
};

export default Double;
