import "./Team.css";
import teamname from "../../images/teamname.png";

const Team = () => {
  return (
    <>
      <div className="teamdiv">
        <div className="imageupper">
          <div className="imagelower">
            <img src={teamname} alt="teamname" height="100%" width="100%"></img>
          </div>
        </div>
        <div className="nameheading">
          <h2 className="teamheading">{localStorage.nameteam}</h2>
        </div>
      </div>
    </>
  );
};

export default Team;
