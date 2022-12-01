import Click from "../click/Click";
import plus from "../../images/plus.png";
import minus from "../../images/minus.png";
import "./Auction.css";
import teamname from "../../images/teamname.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../Api";
import GetBid from "../getbid/GetBid";

const Auction = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [eachQuestion, setEachQuestion] = useState({});
  const [getBidArray, setGetBidArray] = useState([]);
  const [bidValue, setBidValue] = useState();

  const balancepoints = async () => {
    const res = await axios
      .get(Api.loginteam, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      localStorage.setItem("balancepoint", res.data.balance);
    }
  };

  const getBidQuestion = async () => {
    const res = await axios
      .get(Api.allquestion + localStorage.question + "/get_bids", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      setGetBidArray(res.data.bids);
    }
  };

  const eachClick = async () => {
    const res = await axios
      .get(Api.allquestion + localStorage.question, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      setEachQuestion(res.data.question[0]);
      getBidQuestion();
      setBidValue(res.data.question[0].base_price);
    }
  };

  const placeBid = async () => {
    const data = {
      bid_price: bidValue,
    };
    const res = await axios
      .post(Api.allquestion + localStorage.question + "/place_bid", data, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
    if (res) {
      alert(res.data.message);
    }
    eachClick();
  };

  const eachClickQuestion = (id) => {
    localStorage.setItem("question", id);
    eachClick();
  };

  const everyRender = async () => {
    const res = await axios
      .get(Api.allquestion, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      setAllQuestions(res.data.questions);
      if (localStorage.question === "") {
        localStorage.setItem("question", res.data.questions[0]._id);
      }
      eachClick();
    }
  };

  useEffect(() => {
    everyRender();
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("scrollid");
    slider.scrollLeft = slider.scrollLeft - 200;
  };

  const slideRight = () => {
    const slider = document.getElementById("scrollid");
    slider.scrollLeft = slider.scrollLeft + 200;
  };
  return (
    <>
      <div className="boxdiv">
        <div className="commondiv">
          <div className="common">
            <div className="scrolldiv">
              <div className="innerscrolldiv">
                <div className="lefticon">
                  <i
                    class="bi bi-arrow-left-circle-fill"
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={slideLeft}
                  ></i>
                </div>
                <div className="questionscroll" id="scrollid">
                  {allQuestions.map((val) => {
                    return (
                      <>
                        <div
                          className="eachquestionscroll"
                          onClick={() => {
                            eachClickQuestion(val._id);
                            balancepoints();
                          }}
                        >
                          <h4 className="h4questionscroll">{val.name}</h4>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="righticon">
                  <i
                    class="bi bi-arrow-right-circle-fill"
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={slideRight}
                  ></i>
                </div>
              </div>
            </div>
            <div className="problemimgdiv">
              <div className="probleminnerdiv">
                <div className="imgupperdiv">
                  <img
                    src={teamname}
                    alt="teamname"
                    height="100%"
                    width="100%"
                  />
                </div>
                <div className="h3imgdiv">
                  <h3 className="h3headingdiv">Problem : </h3>
                </div>
              </div>
            </div>
            <div className="questionimg">
              <div className="bothdiv">
                <div className="outerquestionimg">
                  <div className="innerquestionimg">
                    <h3 className="h3questionimg">
                      Base Price : {eachQuestion.base_price}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="questionwriteimg">
                <div className="questionwriteinner">
                  <img
                    src={eachQuestion.img_url}
                    alt="questionimg"
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="commonbox" style={{ paddingLeft: "30px" }}>
            <div className="imagediv">
              <div className="teamupperdiv">
                <div className="teamupperinside">
                  <div className="insidefirst">
                    <h3 className="hinside">{localStorage.nameteam}</h3>
                  </div>
                  <div className="insidesecond">
                    <h3 className="hinside">
                      Balance BRLEth : {localStorage.balancepoint}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="teaminnerdiv">
                <div className="forscroll">
                  {getBidArray.map((val) => {
                    return (
                      <GetBid
                        teamName={val.bid_by.team_name}
                        bidPrice={val.bid_price}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="countdiv">
                <div className="valuediv">
                  <div className="sign">
                    <img
                      src={minus}
                      alt="minus"
                      height="100%"
                      width="100%"
                      onClick={() => {
                        setBidValue(parseInt(bidValue) - 1);
                      }}
                    />
                  </div>
                  <div className="count">
                    <input
                      className="bidvalueinput"
                      type="text"
                      value={bidValue}
                      onChange={(e) => {
                        setBidValue(e.target.value);
                      }}
                    />
                  </div>
                  <div className="sign">
                    <img
                      src={plus}
                      alt="plus"
                      height="100%"
                      width="100%"
                      onClick={() => {
                        setBidValue(parseInt(bidValue) + 1);
                      }}
                    />
                  </div>
                </div>
              </div>
              <Click val="Place Bid" function={placeBid} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
