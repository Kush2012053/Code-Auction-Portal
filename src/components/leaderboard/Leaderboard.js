import "./Leaderboard.css";
import axios from "axios";
import Api from "../../Api";
import { useEffect, useState } from "react";
import TransactionCommon from "../transactioncommon/TransactionCommon";

const Leaderboard = () => {
  const [lead, setLead] = useState([]);
  const everyLeaderBoard = async () => {
    const res = await axios
      .get(Api.leaderboard, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      setLead(res.data);
      console.log(res);
    }
  };

  useEffect(() => {
    everyLeaderBoard();
  }, []);

  return (
    <>
      <div className="leaderdiv">
        <div className="leaderheading">
          <h1 className="h1leader">Leader Board</h1>
        </div>
        <div className="generaltable">
          <div className="generaltop">
            <div className="general">
              <div className="generaldiv" style={{ width: "25%" }}>
                <h2 className="headinggeneral">Rank</h2>
              </div>
              <div className="generaldiv" style={{ width: "25%" }}>
                <h2 className="headinggeneral">Team Name</h2>
              </div>
              <div className="generaldiv" style={{ width: "25%" }}>
                <h2 className="headinggeneral">Time</h2>
              </div>
              <div className="generaldiv" style={{ width: "25%" }}>
                <h2 className="headinggeneral">Stars</h2>
              </div>
            </div>
          </div>
          <div className="generalbottom">
            {lead.map((val) => {
              return (
                <TransactionCommon
                  first={val.rank}
                  second={val.team_name}
                  third={val.time_to_solve / 1000}
                  fourth={val.score / 100}
                  color="white"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
