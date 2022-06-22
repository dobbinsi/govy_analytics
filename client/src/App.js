import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleMain from "./components/SingleMain";
import Double from "./components/Double";
import Single from "./components/Single";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <SingleMain />
      <Double />
      <Single />
      <Footer />
    </div>
  );
};

export default App;
