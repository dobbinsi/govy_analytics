import flipsidelogo from "../logos/flipside.png";

const Footer = () => {
  return (
    <div className="footer">
      <h3>
        Built by <a href="https://twitter.com/banbannard">banbannard</a> &{" "}
        <a href="https://twitter.com/dawbyinz">d0bby</a>
      </h3>
      <div className="logo-footer">
        <h2 className="footer-bigtxt">Powered by</h2>
        <a href="https://app.flipsidecrypto.com/dashboard/marinade-governance-YQ_IUg">
          {" "}
          <img
            src={flipsidelogo}
            className="flipside-logo"
            alt="flipside"
          />{" "}
        </a>
      </div>
    </div>
  );
};

export default Footer;
