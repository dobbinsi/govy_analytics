import React, { useState, useEffect } from "react";
import axios from "axios";

const SinglePopular = () => {
  const [popTableData, setPopTableData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/ce3506f4-267d-45a8-9df4-96f926bbf159/data/latest"
      )
      .then((res) => {
        setPopTableData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <h3 className="table-title">Most Popular Validators</h3>
      <table className="table-main">
        <thead>
          <tr>
            <th className="first-column">Validator Name</th>
            <th>Unique Voters</th>
            <th>Total Votes (MNDE)</th>
          </tr>
        </thead>
        <tbody>
          {popTableData.map((validator, index) => (
            <tr>
              <td>{validator.VALIDATOR_NAMES}</td>
              <td className="validator-voters">{validator.VOTERS}</td>
              <td className="validator-shares">
                {validator.TOTAL_DELEGATED_SHARES.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SinglePopular;
