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

  votingData.sort(compare);

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

  const propDetails = [
    "gm governance!",
    "Redirect Marinade protocol fees to the SOL staked pool",
    "Vote on validators stake using on-chain gauges",
    "Move Liquidity Mining from Chefs to Gauges",
    "Marinade Token exchange program",
    "Market Making Partnership with Lifinity",
    "Delegation strategy and fee structure changes",
    "Marketing budget",
    "Grant committee",
    "Formal censure of Batman1241#6915",
    "Disabling of current permissioned/closed gauge and prevent future ones",
    "Preventing the Creation of Permissioned/Closed Gauges",
    "Grant for further development of gamified ranking for chefs",
    "Increase governable stake in validator gauges to 20%",
    "Validator's stake accounts used as collateral through Marinade",
    "Remove Lifinity liquidity gauge",
    "Elect @dobby to the grant committee",
    "Use of Treasury to hire Soju a Male Escort",
    "Liquid Unstake Pool parameters change",
    "Launch Open Doors program",
  ];

  const propResults = [
    "Pass",
    "Pass",
    "Pass",
    "Pass",
    "Pass",
    "Pass",
    "Pass",
    "Pass",
    "Pass",
    "Fail",
    "Fail",
    "Pass",
    "Fail",
    "Pass",
    "Pass",
    "Pass",
    "Pass",
    "Fail",
    "Pass",
    "Pass",
  ];

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
      tooltip: {
        callbacks: {
          afterTitle: function (context) {
            return `${propDetails[context[0].dataIndex]}`;
          },
          afterBody: function (context) {
            return `Result: ${propResults[context[0].dataIndex]}`;
          },
        },
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
        "https://node-api.flipsidecrypto.com/api/v2/queries/57c5afb3-800f-4f30-bdfc-d75afd2b2889/data/latest"
      )
      .then((res) => {
        setVotingData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <h2>Average Turnout</h2>
      <h3>{Math.round(averageTurnout)} Governooors</h3>
      <div className="chart-area">
        <Bar options={propChartOptions} data={propChartData} />
      </div>
    </div>
  );
};

export default SingleProps;
