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
        console.log(res.data);
        setPopTableData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <h1>this will be a table jawn</h1>
    </div>
  );
};

export default SinglePopular;
