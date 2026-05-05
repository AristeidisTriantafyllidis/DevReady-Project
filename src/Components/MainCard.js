
import React from "react";


export default function MainCard(props) {
    
  return (
    <div className="mainCard" >
        <div className="main--Card" onClick={() => props.showPage(props.id)}>
      <p>{props.direction} {props.status}</p>
      <p>{props.from}</p>
      <p>{props.to}</p>
      <p>{props.date}</p>
      <p>{props.hour}</p>
      <p>{props.duration > 0 ? `${props.duration}s` : ""}</p>
      </div>
      <button onClick={() => props.deleteCall(props.id)}>Archive</button>
    </div>
  );
}