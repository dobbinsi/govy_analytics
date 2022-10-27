import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const SingleWhales = () => {
  const [whaleTableData, setWhaleTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const sliceWhale = whaleTableData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/8e8c477a-190e-42b6-98c6-3ca61c2fbf61/data/latest"
      )
      .then((res) => {
        setWhaleTableData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <h3 className="table-title">Whale Watching</h3>
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="table-main">
            <thead>
              <tr>
                <th className="first-column">Wallet Address</th>
                <th>MNDE Locked</th>
                <th>Validator Name</th>
                <th>Total Votes</th>
              </tr>
            </thead>
            <tbody>
              {sliceWhale.map((whale, index) => (
                <tr>
                  <td>
                    <a
                      href={"https://solana.fm/address/".concat(whale.WHALES)}
                      className="table-links"
                    >
                      {whale.WHALES}
                    </a>
                  </td>
                  <td className="validator-voters">
                    {whale.NET_MNDE_LOCKED.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="validator-shares">{whale.VALIDATOR_NAMES}</td>
                  <td className="validator-shares">
                    {whale.TOTAL_DELEGATED_SHARES.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            total={180}
            limit={20}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <div className="footnote-whale">
        <p>
          * Total Votes column represents the raw sum of votes a given wallet
          has assigned to the validator gauge since inception. Does not
          represent current, net voting power allocated to the gauge. Does not
          include votes from other wallets{" "}
        </p>
      </div>
    </div>
  );
};

export default SingleWhales;
