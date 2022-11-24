import "./Rule.css";
import arrow from "../../images/arrow.png";

const Rule = (props) => {
  return (
    <>
      <div className="rule">
        <div className="symbol">
          <div className="innersymbol">
            <img src={arrow} alt="arrow" height="100%" width="100%" />
          </div>
        </div>
        <div className="pdiv">
          <p className="remove">{props.statement}</p>
        </div>
      </div>
    </>
  );
};

export default Rule;
