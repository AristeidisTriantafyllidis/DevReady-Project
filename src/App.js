import React from 'react';
import './App.css';
import Header from './Components/Header';
import Data from './Components/Data';
import MainCard from './Components/MainCard';
import DetailCard from './Components/DetailCard';
import LoadingPage from './LoadingErrors/LoadingPage';

function App() {
  const [allCalls, setAllCalls] = React.useState(null);
  const [loading, setLoading] = React.useState(true)
  const [display, setDisplay] = React.useState(true)
  const [selectedCall, setSelectedCall] = React.useState(null)


  React.useEffect(() => {
    fetch("https://call-center-mu.vercel.app/calls", {
      headers: {
        "X-User-Id": "Aris"
      }
    })
      .then(res => res.json())
      .then(data => {
        setAllCalls(data);
        setLoading(false)
      })


  }, [])

 React.useEffect(() => {
    fetch(`https://call-center-mu.vercel.app/calls/${selectedCall}`, {
      headers: {
        "X-User-Id": "Aris"
      }
    })
      .then(res => res.json())
      .then(data => {
        setSelectedCall(data);
       
      })


  }, [])


  function toggleScreen(id) {
    setDisplay(!display)
    
     const updateSelectedCall = allCalls?.calls.find((item) => item.id === id)
     setSelectedCall(updateSelectedCall)
     }

function deleteCall(id) {
   // const updateCalls = allCalls?.calls?.filter((item) => item.id !== id);
    const updateCalls = allCalls?.calls?.find((item) => item.id == id);
    setAllCalls(allCalls?.calls?.remove(updateCalls));
    console.log(updateCalls)
    }

  const Main = allCalls?.calls?.map((mock) => {
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

let Detail=null
  if (selectedCall !== null) {
    Detail = (
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
        notes={selectedCall.notes && selectedCall.notes.length > 0 ? selectedCall.notes.content : "No notes for this call"}
        switch={toggleScreen}
      />
    );
  }
  

  let page;

if (loading) {
  page = <LoadingPage />;
} 
else if (display === true) {
  page = (
    <>
      <h3>Activity feed</h3>
      {Main}
    </>
  );
} 
else {
  page = Detail;
}



  return (
    <div className="App">
      <Header />
{page}
      
    </div>
  );
}

export default App;