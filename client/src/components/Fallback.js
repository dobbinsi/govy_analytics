import React from "react";
import fscube from "../logos/fscube.png";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function Fallback() {
  return (
    <div style={style} className="fallback">
      <a
        href="https://flipsidecrypto.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-links"
      >
        {" "}
        <img src={fscube} className="fs-logo" alt="flipside" />
      </a>
      <h3>We're fixing something... Please check back later!</h3>
    </div>
  );
}

export default Fallback;
