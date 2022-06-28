import marinadelogo from "../logos/marinade.png";

const Header = () => {
  return (
    <div className="header-main">
      <div className="logo-main">
        <a href="https://marinade.finance/">
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
  );
};

export default Header;
