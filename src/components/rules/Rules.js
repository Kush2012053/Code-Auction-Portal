import { useNavigate } from "react-router-dom";
import "./Rules.css";
import Array from "./Array";
import Click from "../click/Click";
import Rule from "./Rule";
import Team from "../team/Team";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../Api";

const Rules = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const clickLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const everyRender = async () => {
    const res = await axios
      .get(Api.loginteam, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      console.log(res);
      localStorage.setItem("nameteam", res.data.team_name);
      localStorage.setItem("balancepoint", res.data.balance);
      setData(res.data);
    }
  };

  useEffect(() => {
    everyRender();
  }, []);

  return (
    <>
      <div className="boxdiv">
        <div className="commondiv">
          <div className="common">
            <div className="rulesdiv">
              <h1 className="rulesheading"># RULES :-</h1>
            </div>
            <div className="arraydiv">
              {Array.map((val) => {
                return <Rule statement={val} />;
              })}
            </div>
          </div>
          <div className="commonbox">
            <div className="imagediv" style={{ padding: "20px 40px" }}>
              <Team />
              <div className="contentdiv">
                <div>
                  <h4 className="boxcolor">Team Leader : {data.leader_name}</h4>
                  {(() => {
                    if (data.member_1_name !== undefined) {
                      return (
                        <h4 className="boxcolor">
                          Member 1 : {data.member_1_name}
                        </h4>
                      );
                    }
                  })()}
                  {(() => {
                    if (data.member_2_name !== undefined) {
                      return (
                        <h4 className="boxcolor">
                          Member 2 : {data.member_2_name}
                        </h4>
                      );
                    }
                  })()}
                  {(() => {
                    if (data.member_3_name !== undefined) {
                      return (
                        <h4 className="boxcolor">
                          Member 3 : {data.member_3_name}
                        </h4>
                      );
                    }
                  })()}
                </div>
              </div>
              <Click val="Logout" function={clickLogout} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rules;
