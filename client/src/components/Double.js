import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

const Double = () => {
  const [voterDistribution, setVoterDistribution] = useState([]);
  const [participation, setParticipation] = useState([]);

  voterDistribution.sort(compare);
  participation.sort(compareTwo);

  const distChartLevels = voterDistribution.map((item) => {
    return item["LEVELS"];
  });
  const distChartWallets = voterDistribution.map((item) => {
    return item["NUMBER_OF_NFTS"];
  });
  const partChartWallets = participation.map((item) => {
    return item["HOLDERS_VOTERS"];
  });
  const partChartStatus = participation.map((item) => {
    return item["VOTING_STATUS"];
  });

  function compare(a, b) {
    const nameA = a.LEVELS;
    const nameB = b.LEVELS;

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  function compareTwo(a, b) {
    const nameA = a.VOTING_STATUS;
    const nameB = b.VOTING_STATUS;

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  const distChartData = {
    labels: distChartLevels,
    datasets: [
      {
        label: "# of Voters",
        data: distChartWallets,
        backgroundColor: [
          "#308d89",
          "#27a17a",
          "#d1c8b6",
          "#c8ece0",
          "#e76d48",
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
        text: "Voting Power Distribution (Unique Wallets)",
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
        backgroundColor: ["#308d89", "#e76d48"],
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
        "https://node-api.flipsidecrypto.com/api/v2/queries/fefc8c90-bfa6-489e-a183-5d41ca497931/data/latest"
      )
      .then((res) => {
        setParticipation(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/8253d6f3-a9ac-4fda-a811-9ce98087a323/data/latest"
      )
      .then((res) => {
        setVoterDistribution(res.data);
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
        <div className="footnote">
          <p>
            * Includes wallets that have voted on at least one proposal or
            validator gauge{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Double;
