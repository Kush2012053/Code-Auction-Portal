import "./Click.css";

const Click = (props) => {
  return (
    <>
      <div className="clickdiv">
        <div className="innerclick" onClick={props.function}>
          <h3 className="clickheading">{props.val}</h3>
        </div>
      </div>
    </>
  );
};

export default Click;
