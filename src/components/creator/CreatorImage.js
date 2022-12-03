const CreatorImage = (props) => {
  return (
    <>
      <div className="pagechild">
        <div className="pagefirst">
          <div className="imgdivpage">
            <img src={props.image} height="100%" width="100%" />
          </div>
        </div>
        <div className="pagesecond">
          <div>
            <h2>{props.name}</h2>
            <h3>{props.domain}</h3>
          </div>
        </div>
        <div className="pagethird">
          <div className="pageiconouter">
            <a href={props.linkedin} className="apage">
              <i class="bi bi-linkedin pageicons"></i>
            </a>
            <a href={props.github} className="apage">
              <i class="bi bi-github pageicons"></i>
            </a>
            <a href={props.instagram} className="apage">
              <i class="bi bi-instagram pageicons"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorImage;
