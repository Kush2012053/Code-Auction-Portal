import "./Transaction.css";
import TransactionCommon from "../transactioncommon/TransactionCommon";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../Api";

const Transaction = () => {
  const [pagesCount, setPagesCount] = useState();
  const [transactionArray, setTransactionArray] = useState([]);

  const everyRender = async () => {
    const res = await axios
      .get(Api.transaction + `?page=${localStorage.page}&limit=10`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      console.log(res);
      setPagesCount(res.data.total);
      setTransactionArray(res.data.transactions);
    }
  };

  useEffect(() => {
    everyRender();
  }, []);

  const leftSlide = () => {
    const slider = document.getElementById("arrowscroll");
    slider.scrollLeft = slider.scrollLeft - 200;
  };

  const rightSlide = () => {
    const slider = document.getElementById("arrowscroll");
    slider.scrollLeft = slider.scrollLeft + 200;
  };
  const pageClick = (i) => {
    localStorage.setItem("page", i);
    everyRender();
  };
  var rows = [];

  for (var i = 1; i <= Math.ceil(pagesCount / 10); i++) {
    rows.push(
      <div
        className="number"
        onClick={() => {
          pageClick(i);
        }}
      >
        <h5 className="transactionh5">{i}</h5>
      </div>
    );
  }

  return (
    <>
      <div className="transactiondiv">
        <div className="transactionheading">
          <div className="transactiontop">
            <div className="history">
              <h1>Transaction History : </h1>
            </div>
            <div className="remaining">
              <h1>Remaining BRLEth: {localStorage.balancepoint}</h1>
            </div>
          </div>
        </div>
        {pagesCount === 0 ? (
          <div className="nohistory">
            <div className="message">
              <h2>
                You have no Transaction <br /> history yet.
              </h2>
            </div>
          </div>
        ) : (
          <div className="generaltable">
            <div className="generaltop">
              <div className="general">
                <div className="generaldiv" style={{ width: "25%" }}>
                  <h2 className="headinggeneral">S.No.</h2>
                </div>
                <div className="generaldiv" style={{ width: "25%" }}>
                  <h2 className="headinggeneral">Problem Id</h2>
                </div>
                <div className="generaldiv" style={{ width: "25%" }}>
                  <h2 className="headinggeneral">Team Name</h2>
                </div>
                <div className="generaldiv" style={{ width: "25%" }}>
                  <h2 className="headinggeneral">Price</h2>
                </div>
              </div>
            </div>
            <div className="generalbottom">
              {transactionArray.map((val) => {
                return (
                  <TransactionCommon
                    first="S.No."
                    second={val.description}
                    third={val.from.team_name}
                    fourth={val.amount}
                  />
                );
              })}
            </div>
            <div className="transactionupscroll">
              <div className="transactiondownscroll">
                <div className="leftbutton">
                  <i
                    class="bi bi-arrow-left-circle-fill"
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={leftSlide}
                  ></i>
                </div>
                <div className="transactionscroll" id="arrowscroll">
                  {rows}
                </div>
                <div className="rightbutton">
                  <i
                    class="bi bi-arrow-right-circle-fill"
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={rightSlide}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Transaction;
