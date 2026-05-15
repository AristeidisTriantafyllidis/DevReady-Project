import React from "react";



export default function MainCard(props) {

const [date, hour] = props.date?.replace("Z", "").split("T");
  return (

    <div className="mainCard" >
   

      <div className="main--Card" onClick={() => props.switch(props.id)}>
        <div className="status-card">
          <span className={props.direction}>{props.direction === "inbound" ? "↙️ " : "↗️ "}{props.direction}</span>
          <span className={props.status}> {props.status}</span>
        </div>
        <p className="from">{props.from}</p>
        <p>{props.to}</p>
        <p className="date">{date}</p>
        <div className="hour">
          <span>{hour}</span>
          <span className="seconds">{props.duration > 0 ? `${props.duration}s` : ""}</span>
        </div>
      </div>
      <button className="arcBtn" onClick={() => props.deleteCall(props.id)}>Archive</button>
    </div>


  );
}
