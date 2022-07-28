import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, PolarArea } from "react-chartjs-2";

const Double = () => {
  const [voterDistribution, setVoterDistribution] = useState([]);
  const [overlapData, setOverlapData] = useState([]);

  voterDistribution.sort(compare);

  const distChartLevels = voterDistribution.map((item) => {
    return item["LEVELS"];
  });
  const distChartWallets = voterDistribution.map((item) => {
    return item["NUMBER_OF_NFTS"];
  });
  const overlapBuyers = overlapData.map((item) => {
    return item["CHEF_BUYERS_COUNT"];
  });
  const overlapProjects = overlapData.map((item) => {
    return item["PROJECT_NAMES"];
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
        text: "Total Chef NFT Supply by Level",
        font: {
          size: 18,
          family: "'Maven Pro', sans-serif",
          weight: "lighter",
        },
      },
    },
  };

  const overlapChartData = {
    labels: overlapProjects,
    datasets: [
      {
        label: "# of Wallets",
        data: overlapBuyers,
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

  const overlapChartOptions = {
    responsive: true,
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
        text: "NFT Community Overlap (Unique Wallets)",
        font: {
          size: 18,
          family: "'Maven Pro', sans-serif",
          weight: "lighter",
        },
      },
    },
  };

  ChartJS.register(RadialLinearScale, ArcElement, Title, Tooltip, Legend);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/a91055d1-4a30-4286-9766-7e26fd2c36db/data/latest"
      )
      .then((res) => {
        setOverlapData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/bb7d0a02-a974-4ee7-a03a-bad2ac6eb3c6/data/latest"
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
        <PolarArea options={overlapChartOptions} data={overlapChartData} />
        <div className="footnote">
          <p>
            * Reflects purchasing behavior of Chef NFT wallets from Dec. 1 2021 - present{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Double;
