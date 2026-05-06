import React from 'react';
import './App.css';
import Header from './Components/Header';
import Data from './Components/Data';
import MainCard from './Components/MainCard';
import DetailCard from './Components/DetailCard';

function App() {

const [display,setDisplay]=React.useState(false)
  
  const screenChange=React.useEffect(()=>{
     setDisplay(!display)
  },[])

  const [allCalls, setAllCalls] = React.useState(Data);


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
       change={screenChange}
       
       
      />
    );
  });

  const Detail = Data.map((mock) => {
    const [date, hour] = mock.created_at.replace("Z", "").split("T");
    return (
      <DetailCard
        key={mock.id}
        direction={mock.direction}
        from={mock.from}
        to={mock.to}
        status={mock.call_type}
        duration={mock.duration}
        date={date}
        hour={hour}
        archive={mock.is_archived}
        notes={mock.notes ? mock.notes[0].content : "No notes for this call"}
      />
    );
  });




  function deleteCall(id) {
    const updateCalls = allCalls.filter((item) => item.id !== id);
    setAllCalls(updateCalls);
  }

  
  return (
    <div className="App">
      <Header />
      {display? <h3>Activity feed</h3>:""}
      {display? Main:Detail}

    </div>
  );
}

export default App;