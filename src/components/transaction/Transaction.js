import "./Transaction.css";
import TransactionCommon from "../transactioncommon/TransactionCommon";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../Api";

const Transaction = () => {
  const [transactionArray, setTransactionArray] = useState([]);
  const [total, setTotal] = useState();

  const everyRender = async () => {
    const res = await axios
      .get(Api.transaction + "?page=1&limit=5000", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      setTransactionArray(res.data.transactions);
      setTotal(res.data.total);
    }
  };

  useEffect(() => {
    everyRender();
  }, []);

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
        {total === 0 ? (
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
              {transactionArray.map((val, index) => {
                return (
                  <TransactionCommon
                    first={index + 1}
                    second={val.description}
                    third={val.from.team_name}
                    fourth={val.amount}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Transaction;
