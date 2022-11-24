import "./Solve.css";
import { useEffect, useState } from "react";
import Api from "../../Api";
import teamname from "../../images/teamname.png";
import axios from "axios";
import questionimage from "../../images/question.jpg";

const Solve = () => {
  const [allQuestionsSolve, setAllQuestionsSolve] = useState([]);
  const everyRender = async () => {
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
    }
  };

  useEffect(() => {
    everyRender();
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
                        <div className="eachquestionscroll">
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
              <div className="solvefirst">
                <div className="imgdivsolve">
                  <img src={questionimage} alt="solveimg" width="100%" />
                </div>
              </div>
              <div className="solvesecond">
                <div className="headingsolve">
                  <h3 className="h3outputsolve">Output : </h3>
                </div>
                <div className="solvebottom">
                  <div className="bottomfirst">
                    <form className="formdiv">
                      <textarea className="inputsolve"></textarea>
                    </form>
                  </div>
                  <div className="bottomsecond">
                    <div className="bottomimg">
                      <h4 className="h4solve">Submit</h4>
                    </div>
                  </div>
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
