const TransactionCommon = (props) => {
  return (
    <>
      <div className="divcommon">
        <div className="commontop">
          <div className="general">
            <div className="generaldiv" style={{ width: "25%" }}>
              <h3 className="headinggeneral">{props.first}</h3>
            </div>
            <div className="generaldiv" style={{ width: "25%" }}>
              <h3 className="headinggeneral">{props.second}</h3>
            </div>
            <div className="generaldiv" style={{ width: "25%" }}>
              <h3 className="headinggeneral">{props.third}</h3>
            </div>
            <div className="generaldiv" style={{ width: "25%" }}>
              <h3 className="headinggeneral">{props.fourth}</h3>
            </div>
          </div>
        </div>
        <div className="hrdiv">
          <hr style={{ borderColor: props.color }} />
        </div>
      </div>
    </>
  );
};

export default TransactionCommon;
