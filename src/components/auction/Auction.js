import Click from "../click/Click";
import plus from "../../images/plus.png";
import minus from "../../images/minus.png";
import "./Auction.css";
import teamname from "../../images/teamname.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../Api";
import GetBid from "../getbid/GetBid";
import beep from "../../images/beep.mpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import Spinner from "react-spinner-material";

const Auction = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [eachQuestion, setEachQuestion] = useState({});
  const [getBidArray, setGetBidArray] = useState([]);
  const [bidValue, setBidValue] = useState();
  const [bid, setBid] = useState(false);

  const play = () => {
    new Audio(beep).play();
  };

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
    setBid(true);
    const data = {
      bid_price: bidValue,
    };
    const res = await axios
      .post(Api.allquestion + localStorage.question + "/place_bid", data, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        setBid(false);
        console.log(err);
        toast.info(err.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    if (res) {
      setBid(false);
      play();
      {
        /*toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });*/
      }
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
    balancepoints();
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("scrollid");
    slider.scrollLeft = slider.scrollLeft - 200;
  };

  const slideRight = () => {
    const slider = document.getElementById("scrollid");
    slider.scrollLeft = slider.scrollLeft + 200;
  };

  //auction_started socket event
  useEffect(() => {
    //var socket = io("https://code-auction-backend.up.railway.app/");
    var socket = io("https://code-auction-backend.brlakgec.com/");
    socket.on("auction_started", function (data) {
      toast.info(data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });

    //auction_stopped_not_sold socket event
    //var socket = io("https://code-auction-backend.herokuapp.com");
    socket.on("auction_stopped_not_sold", function (data) {
      toast.info(data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });

    //auction_stopped_sold socket even
    socket.on("auction_stopped_sold", function (data) {
      toast.info(data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });

    //auction_stopped_not_sold (no team has sufficient balance) socket event
    socket.on("auction_stopped_not_sold", function (data) {
      toast.info(data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });

    //new_bid socket event
    socket.on("new_bid", function (data) {
      getBidQuestion();
      toast.success(data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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
                    if (val.status === "sold") {
                      return (
                        <>
                          <div
                            className="eachquestionscroll"
                            onClick={() => {
                              eachClickQuestion(val._id);
                              balancepoints();
                            }}
                            style={{ backgroundColor: "#CAA692" }}
                          >
                            <h4 className="h4questionscroll">{val.name}</h4>
                          </div>
                        </>
                      );
                    }
                    if (val.status !== "sold") {
                      return (
                        <>
                          <div
                            className="eachquestionscroll"
                            onClick={() => {
                              eachClickQuestion(val._id);
                              balancepoints();
                            }}
                            style={{
                              backgroundColor: "#7F2740",
                              color: "white",
                            }}
                          >
                            <h4 className="h4questionscroll">{val.name}</h4>
                          </div>
                        </>
                      );
                    }
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
                  <h3 className="h3headingdiv">
                    Problem : {eachQuestion.name}
                  </h3>
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
              <ToastContainer />
              {!bid && <Click val="Place Bid" function={placeBid} />}
              {bid && (
                <div className="clickdiv">
                  <div className="innerclick" onClick={placeBid}>
                    <h3 className="clickheading">
                      <Spinner
                        radius={20}
                        color={"white"}
                        stroke={3}
                        visible={true}
                      />
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
