import React from "react";

function ContentTitle({ title, txt = <div></div>, btn = <div></div> }) {
  return (
    <div className="content-title">
      <h3>{title}</h3>
      {/* <div>{txt}</div> */}
      {txt}
      {btn}
    </div>
  );
}

export default ContentTitle;
