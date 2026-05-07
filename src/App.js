import React from 'react';
import './App.css';
import Header from './Components/Header';
import Data from './Components/Data';
import MainCard from './Components/MainCard';
import DetailCard from './Components/DetailCard';

function App() {

  const [display, setDisplay] = React.useState(true)
  const [allCalls, setAllCalls] = React.useState(Data);
  const [idCall, seIdCall] = React.useState(1)

  function toggleScreen(id) {
    setDisplay(!display)
    seIdCall(id)
    }

  const Main = allCalls.map((mock) => {
    const [date, hour] = mock.created_at.replace("Z", "").split("T");
    return (

      <MainCard

        key={mock.id}
        direction={mock.direction}
        from={mock.from}
        to={mock.to}
        date={date}
        hour={hour}
        duration={mock.duration}
        status={mock.call_type}
        id={mock.id}
        deleteCall={deleteCall}
        switch={toggleScreen}


      />
    );
  });

   const Detail = 
  //  const [date, hour] = mock.created_at.replace("Z", "").split("T");

 
     <DetailCard

         key={Data[Number(idCall)-1].direction}
         direction={Data[Number(idCall)-1].direction}
         id={idCall}
          from={Data[Number(idCall)-1].from}
         to={Data[Number(idCall)-1].to}
         status={Data[Number(idCall)-1].call_type}
         duration={Data[Number(idCall)-1].duration}
         date={Data[Number(idCall)-1].created_at}
        // hour={hour}
         archive={Data[Number(idCall)-1].is_archived}
         notes={Data[Number(idCall)-1].notes ? Data[Number(idCall)-1].notes[0].content : "No notes for this call"}
        switch={toggleScreen}
      />





  function deleteCall(id) {
    const updateCalls = allCalls.filter((item) => item.id !== id);
    setAllCalls(updateCalls);
  }


  return (
    <div className="App">
      <Header />
      {display ? <h3>Activity feed</h3> : ""}
      {display ? Main : Detail}

    </div>
  );
}

export default App;