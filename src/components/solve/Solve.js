import "./Solve.css";
import { useEffect, useState } from "react";
import Api from "../../Api";
import teamname from "../../images/teamname.png";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Spinner from "react-spinner-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Solve = () => {
  const [allQuestionsSolve, setAllQuestionsSolve] = useState([]);
  const [icon, setIcon] = useState("bi bi-caret-down-fill");
  const [property, setProperty] = useState("none");
  const [language, setLanguage] = useState([]);
  const [codeValue, setCodeValue] = useState("");
  const [languageName, setLanguageName] = useState("Select Language");
  const [languageId, setLanguageId] = useState();
  const [show, setShow] = useState("none");
  const [load, setLoad] = useState(false);
  const [expectedOutput, setExpectedOutput] = useState("");
  const [stdin, setStdIn] = useState("");
  const [stderr, setStdErr] = useState("");
  const [stdout, setStdOut] = useState("");
  const [error, setError] = useState("");
  const [questionDetails, setQuestionDetails] = useState({});

  const eachSolve = async () => {
    const res = await axios
      .get(Api.assign + localStorage.solveid, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      console.log(res);
      setCodeValue(res.data.last_submission);
      setQuestionDetails(res.data.question);
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
        toast.error(err.response.data.message, {
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
      if (res.data.message === "Accepted!! 3/3 private test cases passing.") {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      console.log(res);
      setLoad(false);
      setExpectedOutput(res.data.result.expected_output);
      setStdIn(res.data.result.stdin);
      setStdErr(res.data.result.stderr);
      setStdOut(res.data.result.stdout);
      setError(res.data.result.status.description);
      setShow("block");
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
      }
      eachSolve();
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
      {allQuestionsSolve.length === 0 ? (
        <div className="nobuy">
          <h1 className="tracking-in-contract">Please buy a question.</h1>
        </div>
      ) : (
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
                              eachSolve();
                              setIcon("bi bi-caret-down-fill");
                              setProperty("none");
                              setLanguageName("Select Language");
                              setLanguageId();
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
                    <h3 className="h3headingdiv">
                      Problem : {questionDetails.name}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="solvemaindiv">
                <div className="solveinnerdiv">
                  <div className="solveimgdiv">
                    <img
                      src={questionDetails.img_url}
                      alt="questionimg"
                      width="100%"
                    />
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
                  <ToastContainer />
                  {!load && (
                    <div
                      className="solveclick"
                      onClick={() => {
                        if (languageName === "Select Language") {
                          toast.warning("Please choose a language to use", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        } else {
                          setLoad(true);
                          submitAnswer();
                          eachSolve();
                          solveEveryRender();
                        }
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
                        <textarea
                          className="submittextarea"
                          value={atob(expectedOutput)}
                        />
                      </div>
                      <div className="outputdivmiddle">
                        <h3 className="outputh3">Standard Input</h3>
                        <textarea
                          className="submittextarea"
                          value={atob(stdin)}
                        />
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
                                <textarea
                                  className="submittextarea"
                                  value={atob(stdout)}
                                />
                              </>
                            );
                          }
                        })()}
                        {/*{(() => {
                        if (stderr !== null) {
                          return (
                            <>
                              <h3 className="outputh3">Standard Error</h3>
                              <textarea
                                className="submittextarea"
                                value={atob(stderr)}
                              />
                            </>
                          );
                        }
                      })()}*/}
                      </div>
                    </div>
                    {(() => {
                      if (stderr !== null) {
                        return (
                          <>
                            <div>
                              <h3
                                className="outputh3"
                                style={{ textAlign: "left" }}
                              >
                                Standard Error
                              </h3>
                              <textarea
                                value={atob(stderr)}
                                className="submittextarea"
                                style={{
                                  fontSize: "16px",
                                  color: "red",
                                  boxSizing: "border-box",
                                }}
                              />
                            </div>
                          </>
                        );
                      }
                    })()}
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
                                <h4 className="tickh4">
                                  {val.question_id.name}
                                </h4>
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
                      <h3 className="h3solve">{localStorage.stars}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Solve;
