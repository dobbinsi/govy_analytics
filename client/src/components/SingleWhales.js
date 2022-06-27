import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleWhales = () => {
  const [whaleTableData, setWhaleTableData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/4d9a0459-6c86-4f67-8738-346ed0eb54c9/data/latest"
      )
      .then((res) => {
        setWhaleTableData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <h3 className="table-title">Whale Watching</h3>
      <table className="table-main">
        <thead>
          <tr>
            <th className="first-column">Wallet Address</th>
            <th>MNDE Locked</th>
            <th>Validator Name</th>
            {/* <th>Total Votes (MNDE)</th> */}
          </tr>
        </thead>
        <tbody>
          {whaleTableData.map((whale, index) => (
            <tr>
              <td>{whale.WHALES}</td>
              <td className="validator-voters">
                {whale.NET_MNDE_LOCKED.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </td>
              <td className="validator-shares">{whale.VALIDATOR_NAMES}</td>
              {/* <td className="validator-shares">
                {whale.TOTAL_DELEGATED_SHARES.toLocaleString()}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SingleWhales;
