import "./App.css";
import marinadelogo from "./logos/marinade.png";
import Footer from "./components/Footer";
import SingleMain from "./components/SingleMain";
import Double from "./components/Double";
import SingleNFT from "./components/SingleNFT";
import SingleTopAddys from "./components/SingleTopAddys";
import SingleProps from "./components/SingleProps";
import SinglePopular from "./components/SinglePopular";
import SinlgeWhales from "./components/SingleWhales";
import DoubleDouble from "./components/DoubleDouble";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/Fallback";

const App = () => {
  const errorHandler = (error, errorInfo) => {
    console.log("Logging...", error, errorInfo);
  };

  return (
    <div className="wrapper">
      <div className="header-main">
        <div className="logo-main">
          <a
            href="https://marinade.finance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <img
              src={marinadelogo}
              className="marinade-logo"
              alt="marinade"
            />{" "}
          </a>
        </div>
        <div className="txt-main">
          <h1 className="header-bigtxt">Governance Analytics</h1>
        </div>
      </div>
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <SingleMain />
        <SingleNFT />
        <DoubleDouble />
        <SingleTopAddys />
        <Double />
        <SingleProps />
        <SinglePopular />
        <SinlgeWhales />
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
