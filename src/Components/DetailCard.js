import React from "react";

export default function DetailCard(props){

    return(
<div>
    <button>Back to calls</button>
    <h2>Call Details</h2>
<p> Direction {props.direction}</p>
<p>From {props.from} </p>
<p>To {props.to}</p>
<p>Type {props.status}</p>
<p>Duration {props.duration}s</p>
<p>Date {props.date},{props.hour}</p>
<p>Archived {props.archive?"Yes":"No"}</p>
<p>{props.notes}</p>
</div> 

)

}