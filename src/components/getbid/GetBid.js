import "./GetBid.css";

const GetBid = (props) => {
  return (
    <>
      <div className="eachquestionbid">
        <div className="eachbidinside">
          <div className="biddiv">
            <h4 className="hinside">{props.teamName}</h4>
          </div>
          <div className="biddiv">
            <h4 className="hinside">{props.bidPrice} BRLEth</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetBid;
