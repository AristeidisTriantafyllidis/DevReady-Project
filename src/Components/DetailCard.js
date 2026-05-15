import React from "react";

export default function DetailCard(props){
     const [date, hour] = props.date?.replace("Z", "").split("T");
    const notes=props.notes?.[0]?.content || "No notes available"
    return(
<div>
    <button className="backBtn" onClick={() => props.switch(props.id)}>Back to calls</button>
    <div className="detailCard">
    <h2>Call Details</h2>
    <div className="detailDerection">
<p> Direction</p>
<p className={props.direction}> {props.direction}</p>
</div>
<div className="from">
<p>From</p><p> {props.from} </p>
</div>
<div className="to">
<p>To </p><p>{props.to}</p></div>
<div className="type">
<p>Type</p> <p className={props.status}> {props.status}</p></div>
<div className="duration">
<p>Duration</p> <p>{props.duration}s</p></div>
<div className="dateDetail">
<p>Date</p> <p>{date}, {hour}</p></div>
<div className="archivedDetail">
<p>Archived</p><p> {props.archive?"Yes":"No"}</p></div>
<p>{notes}</p>
</div>
</div> 

)

}