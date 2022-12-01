import "./Solve.css";
import { useEffect, useState } from "react";
import Api from "../../Api";
import teamname from "../../images/teamname.png";
import axios from "axios";
import Editor from "@monaco-editor/react";
import questionimg from "../../images/question.jpg";
import Spinner from "react-spinner-material";

const Solve = () => {
  const [allQuestionsSolve, setAllQuestionsSolve] = useState([]);
  const [icon, setIcon] = useState("bi bi-caret-down-fill");
  const [property, setProperty] = useState("none");
  const [language, setLanguage] = useState([]);
  const [codeValue, setCodeValue] = useState("");
  const [languageName, setLanguageName] = useState("Select Language");
  const [languageId, setLanguageId] = useState();
  const [stars, setStars] = useState(0);
  const [show, setShow] = useState("none");
  const [load, setLoad] = useState(false);
  const [expectedOutput, setExpectedOutput] = useState("");
  const [stdin, setStdIn] = useState("");
  const [stderr, setStdErr] = useState("");
  const [stdout, setStdOut] = useState("");
  const [error, setError] = useState("");

  const everyStars = async () => {
    const res = await axios
      .get(Api.loginteam, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      setStars(res.data.score / 100);
    }
  };

  const submitAnswer = async () => {
    setLoad(true);
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
        setLoad(false);
        alert(err.response.data.message);
      });
    if (res) {
      console.log(res);
      setLoad(false);
      setExpectedOutput(res.data.result.expected_output);
      setStdIn(res.data.result.stdin);
      setStdErr(res.data.result.stderr);
      setStdOut(res.data.result.stdout);
      setError(res.data.result.status.description);
      setShow("block");
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
      setAllQuestionsSolve(res.data);
      if (localStorage.solveid === "") {
        localStorage.setItem("solveid", res.data[0].question_id._id);
        localStorage.setItem("image", res.data[0].question_id.img_url);
      }
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
                            setLanguageName("");
                            setLanguageId();
                            setCodeValue("");
                            setShow("none");
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
                <div className="solveimgdiv">
                  <img src={questionimg} alt="questionimg" width="100%" />
                </div>
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
                <h3 className="sourcecode">Source Code:</h3>
                <div className="editordiv">
                  <Editor
                    style={{ height: "100%", width: "100%" }}
                    theme="vs-dark"
                    onChange={(e) => {
                      setCodeValue(btoa(e));
                    }}
                    value={atob(codeValue)}
                  />
                </div>
                {!load && (
                  <div
                    className="solveclick"
                    onClick={() => {
                      setLoad(true);
                      submitAnswer();
                      solveEveryRender();
                      everyStars();
                    }}
                  >
                    <h3 className="solvebutton">Submit</h3>
                  </div>
                )}
                {load && (
                  <div
                    className="solveclick"
                    onClick={() => {
                      submitAnswer();
                    }}
                  >
                    <Spinner
                      radius={20}
                      color={"white"}
                      stroke={3}
                      visible={true}
                    />
                  </div>
                )}
                <div style={{ display: show }}>
                  <h3 className="h3testcase">Test Run Results : {error}</h3>
                  <div className="outputdiv">
                    <div className="outputdivinner">
                      <h3 className="outputh3">Expected Output</h3>
                      <p className="paraoutput">{atob(expectedOutput)}</p>
                    </div>
                    <div className="outputdivmiddle">
                      <h3 className="outputh3">Standard Input</h3>
                      <p className="paraoutput">{atob(stdin)}</p>
                    </div>
                    <div className="outputdivinner">
                      <h3 className="outputh3">Standard Output</h3>
                      {(() => {
                        if (stdout === null) {
                          return (
                            <>
                              <p className="paraoutput">NULL</p>
                            </>
                          );
                        }
                      })()}
                      {(() => {
                        if (stdout !== null) {
                          return (
                            <>
                              <p className="paraoutput">{atob(stdout)}</p>
                            </>
                          );
                        }
                      })()}
                      {(() => {
                        if (stderr !== null) {
                          return (
                            <>
                              <h3 className="outputh3">Standard Error</h3>
                              <p className="paraoutput">{atob(stderr)}</p>
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="commonbox">
            <div className="imagediv">
              <div className="uppersolve">
                <div className="submitimgdiv">
                  <div className="submitimginner">
                    <img
                      src={teamname}
                      alt="teamname"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
                <div className="submitteamouter">
                  <div className="submitteaminner">
                    <h2 className="h2submitteam">{localStorage.nameteam}</h2>
                  </div>
                </div>
                <div className="submitstatusouter">
                  {allQuestionsSolve.map((val) => {
                    return (
                      <>
                        <div className="tickouter">
                          <div className="tickinner">
                            <div className="tickinnerfirst">
                              <h3 className="tickh3">{val.question_id.name}</h3>
                            </div>
                            <div className="tickinnersecond">
                              {(() => {
                                if (val.status !== "pending") {
                                  return (
                                    <i
                                      class="bi bi-check-lg"
                                      style={{
                                        color: "#8b444d",
                                        fontSize: "20px",
                                      }}
                                    ></i>
                                  );
                                }
                              })()}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="lowersolve">
                <div className="lowerinnersolve">
                  <div className="innersolvechild">
                    <h3 className="h3solve">Stars</h3>
                  </div>
                  <div className="innersolvechild">
                    <h3 className="h3solve">{stars}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Solve;
