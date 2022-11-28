import "./Solve.css";
import { useEffect, useState } from "react";
import Api from "../../Api";
import teamname from "../../images/teamname.png";
import axios from "axios";
import Editor from "@monaco-editor/react";
import questionimg from "../../images/question.jpg";

const Solve = () => {
  const [allQuestionsSolve, setAllQuestionsSolve] = useState([]);
  const [icon, setIcon] = useState("bi bi-caret-down-fill");
  const [property, setProperty] = useState("none");
  const [language, setLanguage] = useState([]);
  const [codeValue, setCodeValue] = useState("");
  const [languageName, setLanguageName] = useState("");
  const [languageId, setLanguageId] = useState();

  const submitAnswer = async () => {
    const data = {
      attempted_solution: codeValue,
      language_id: languageId,
    };
    const res = await axios
      .post(Api.submit + localStorage.solveid, data, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      console.log(res);
      alert(res.data.message);
    }
  };

  const languageFunction = async () => {
    const res = await axios
      .get(Api.language, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      console.log(res);
      setLanguage(res.data);
    }
  };

  const iconClick = () => {
    if (icon === "bi bi-caret-down-fill") {
      setIcon("bi bi-caret-up-fill");
      setProperty("block");
    } else {
      setIcon("bi bi-caret-down-fill");
      setProperty("none");
    }
  };

  const solveEveryRender = async () => {
    const res = await axios
      .get(Api.solve, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      console.log(res);
      setAllQuestionsSolve(res.data);
      if (localStorage.solveid === "") {
        localStorage.setItem("solveid", res.data[0].question_id._id);
        localStorage.setItem("image", res.data[0].question_id.img_url);
      }
      console.log(localStorage.solveid);
      console.log(localStorage.image);
    }
  };

  useEffect(() => {
    solveEveryRender();
    languageFunction();
  }, []);

  const slideLeftSolve = () => {
    const slider = document.getElementById("scrollidsolve");
    slider.scrollLeft = slider.scrollLeft - 200;
  };

  const slideRightSolve = () => {
    const slider = document.getElementById("scrollidsolve");
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
                    onClick={slideLeftSolve}
                  ></i>
                </div>
                <div className="questionscroll" id="scrollidsolve">
                  {allQuestionsSolve.map((val) => {
                    return (
                      <>
                        <div
                          className="eachquestionscroll"
                          onClick={() => {
                            localStorage.setItem(
                              "solveid",
                              val.question_id._id
                            );
                            localStorage.setItem(
                              "image",
                              val.question_id.img_url
                            );
                            setIcon("bi bi-caret-down-fill");
                            setProperty("none");
                            console.log(localStorage.solveid);
                            console.log(localStorage.image);
                            setLanguageName("");
                            setLanguageId();
                            setCodeValue("");
                          }}
                        >
                          <h4 className="h4questionscroll">
                            {val.question_id.name}
                          </h4>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="righticon">
                  <i
                    class="bi bi-arrow-right-circle-fill"
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={slideRightSolve}
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
            <div className="solvemaindiv">
              <div className="solveinnerdiv">
                <div className="languagediv">
                  <div className="languagefirst">
                    <h3 className="languageh3">Language: </h3>
                  </div>
                  <div className="languagesecond">
                    <div className="languagewrite">
                      <div className="writefirst">{languageName}</div>
                      <div className="writesecond">
                        <i
                          class={icon}
                          style={{
                            height: "16px",
                            width: "16px",
                            color: "#8b444d",
                            cursor: "pointer",
                          }}
                          onClick={iconClick}
                        />
                      </div>
                    </div>
                    <div className="dropdown" style={{ display: property }}>
                      {language.map((val) => {
                        return (
                          <h5
                            className="dropdownh5"
                            onClick={() => {
                              setLanguageName(val.name);
                              setLanguageId(val.id);
                              iconClick();
                            }}
                          >
                            {val.name}
                          </h5>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="solveimgdiv">
                  <img src={questionimg} alt="questionimg" width="100%" />
                </div>
                <h3 className="sourcecode">Source Code:</h3>
                <div className="editordiv">
                  <Editor
                    style={{ height: "100%", width: "100%" }}
                    theme="vs-dark"
                    onChange={(e) => {
                      setCodeValue(btoa(e));
                      console.log(codeValue);
                    }}
                    value={atob(codeValue)}
                  />
                </div>
                <div className="solveclick" onClick={submitAnswer}>
                  <h3 className="solvebutton">Submit</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="commonbox">
            <div className="imagediv"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Solve;
