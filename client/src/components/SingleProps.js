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

const SingleProps = () => {
  const [votingData, setVotingData] = useState([]);
  const numProps = votingData.length;
  const getSum = (arr, key) => {
    return arr.reduce(
      (accumulator, current) => accumulator + Number(current[key]),
      0
    );
  };
  const sumVoters = getSum(votingData, "COUNT_VOTERS");
  const averageTurnout = (sumVoters / numProps).toLocaleString();

  const propNumbers = votingData.map((item) => {
    return item["PROPOSAL_NAMES"];
  });
  const eligibleVoters = votingData.map((item) => {
    return item["ELIGIBLE_VOTERS"];
  });
  const actualVoters = votingData.map((item) => {
    return item["COUNT_VOTERS"];
  });

  function compare(a, b) {
    const nameA = a.PROPOSAL_NAMES;
    const nameB = b.PROPOSAL_NAMES;

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const propChartOptions = {
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
        text: "Voter Participation by Proposal",
        font: {
          size: 18,
          family: "'Maven Pro', sans-serif",
          weight: "lighter",
        },
      },
    },
  };

  const propChartData = {
    labels: propNumbers,
    datasets: [
      {
        label: "Voters",
        data: actualVoters,
        backgroundColor: "#e76d48",
        borderColor: ["#4b423f"],
        borderWidth: 1.5,
      },
      {
        label: "Eligible Wallets",
        data: eligibleVoters,
        backgroundColor: "#308d89",
        borderColor: ["#4b423f"],
        borderWidth: 1.5,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/ee4c1871-180e-452c-8a4b-d2bdd2469dc9/data/latest"
      )
      .then((res) => {
        setVotingData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  votingData.sort(compare);

  return (
    <div className="single">
      <h2>Average Turnout</h2>
      <h3>{averageTurnout} Governooors</h3>

      <div className="chart-area">
        <Bar options={propChartOptions} data={propChartData} />
      </div>
    </div>
  );
};

export default SingleProps;
