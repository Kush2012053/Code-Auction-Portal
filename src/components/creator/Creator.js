import "./Creator.css";
import CreatorImage from "./CreatorImage";
import ImageArray from "./ImageArray";

const Creator = () => {
  return (
    <>
      <div className="pageheading">
        <h1>Creator's Page</h1>
      </div>
      <div className="pageinnerdiv">
        <div className="pageparent">
          {ImageArray.map((val) => {
            return (
              <CreatorImage
                name={val.name}
                domain={val.domain}
                linkedin={val.linkedin}
                github={val.github}
                instagram={val.instagram}
                image={val.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Creator;
