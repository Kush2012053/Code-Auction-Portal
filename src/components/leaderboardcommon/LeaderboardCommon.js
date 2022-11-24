const LeaderboardCommon = (props) => {
  return (
    <>
      <div className="divcommon">
        <div className="commontop">
          <div className="general">
            <div className="generaldiv">
              <h3 className="headinggeneral">{props.first}</h3>
            </div>
            <div className="generaldiv">
              <h3 className="headinggeneral">{props.second}</h3>
            </div>
            <div className="generaldiv">
              <h3 className="headinggeneral">{props.third}</h3>
            </div>
          </div>
        </div>
        <div className="hrdiv">
          <hr style={{ borderColor: "#e3cdb2" }} />
        </div>
      </div>
    </>
  );
};

export default LeaderboardCommon;
