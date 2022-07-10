import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleMain from "./components/SingleMain";
import Double from "./components/Double";
import SingleNFT from "./components/SingleNFT";
import SingleTopAddys from "./components/SingleTopAddys";
import SingleProps from "./components/SingleProps";
import SinglePopular from "./components/SinglePopular";
import SinlgeWhales from "./components/SingleWhales";
import DoubleDouble from "./components/DoubleDouble";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <SingleMain />
      <SingleNFT />
      <DoubleDouble />
      <SingleTopAddys />
      <Double />
      <SingleProps />
      <SinglePopular />
      <SinlgeWhales />
      <Footer />
    </div>
  );
};

export default App;
