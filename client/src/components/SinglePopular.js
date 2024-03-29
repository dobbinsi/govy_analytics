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
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="table-main">
            <thead>
              <tr>
                <th className="first-column">Validator Name</th>
                <th>Unique Voters</th>
                <th>Total Votes (MNDE)</th>
                <th>Avg. MNDE per Voter</th>
              </tr>
            </thead>
            <tbody>
              {popTableData.map((validator, index) => (
                <tr>
                  <td>
                    <a
                      href={"https://solanabeach.io/validators"}
                      className="table-links"
                    >
                      {validator.VALIDATOR_NAMES}
                    </a>
                  </td>
                  <td className="validator-voters">{validator.VOTERS}</td>
                  <td className="validator-shares">
                    {validator.TOTAL_DELEGATED_SHARES.toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </td>
                  <td className="validator-shares">
                    {(
                      validator.TOTAL_DELEGATED_SHARES / validator.VOTERS
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="footnote">
        * Total Votes (MNDE) column represents the raw sum of votes a given
        validator gauge has received since inception. Does not represent
        current, net voting power allocated to the gauge{" "}
      </p>
    </div>
  );
};

export default SinglePopular;
