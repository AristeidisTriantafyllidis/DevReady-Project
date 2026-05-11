import React from 'react';
import './App.css';
import Header from './Components/Header';
import Data from './Components/Data';
import MainCard from './Components/MainCard';
import DetailCard from './Components/DetailCard';

function App() {

  const [display, setDisplay] = React.useState(true)
  const [allCalls, setAllCalls] = React.useState(Data);
  const [selectedCall, setSelectedCall] = React.useState(allCalls[0])
 
  function toggleScreen(id) {
   setDisplay(!display)
    const updateSelectedCall = allCalls.find((item) => item.id === id)
    console.log(updateSelectedCall);
    console.log(id)
    setSelectedCall(updateSelectedCall)
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
    <DetailCard
      key={selectedCall.id}
      direction={selectedCall.direction}
      id={selectedCall.id}
      from={selectedCall.from}
      to={selectedCall.to}
      status={selectedCall.call_type}
      duration={selectedCall.duration}
      date={selectedCall.created_at}
      archive={selectedCall.is_archived}
      notes={selectedCall.notes ? selectedCall.notes[0].content : "No notes for this call"}
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