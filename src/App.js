import React from 'react';
import './App.css';
import Header from './Components/Header';
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
        "X-User-Id": "Ariss"
      }
    })
      .then(res => res.json())
      .then(data => {
        setAllCalls(data);
        setLoading(false)
      })


  }, [])

  React.useEffect(() => {
    if (selectedCall !== null) {
      fetch(`https://call-center-mu.vercel.app/calls/${selectedCall}`, {
        headers: {
          "X-User-Id": "Ariss"
        }
      })
        .then(res => res.json())
        .then(data => {
          setSelectedCall(data);

        })

    }
  },[])


  function toggleScreen(id) {
    setDisplay(!display)
    const updateSelectedCall = allCalls?.calls.find((item) => item.id === id)
    setSelectedCall(updateSelectedCall)

  }

  function deleteCall(id) {
    const updateCalls = allCalls?.calls?.filter((item) => item.id !== id);
    //const updateCalls = allCalls?.calls?.find((item) => item.id == id);
    setAllCalls({ ...allCalls, calls: updateCalls, });
    fetch(`https://call-center-mu.vercel.app/calls/${id}/archive`, {
      method: "PATCH",
      headers: {
        "X-User-Id": "Ariss"
      },
      body: JSON.stringify({
        is_archived: true
      })
    })

  }

  const Main = allCalls?.calls?.map((data) => {
    return (
      <MainCard
        key={data.id}
        direction={data.direction}
        from={data.from}
        to={data.to}
        date={data.created_at}
        duration={data.duration}
        status={data.call_type}
        id={data.id}
        deleteCall={deleteCall}
        switch={toggleScreen}
      />
    );
  });

  let Detail = null
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
       notes={selectedCall.notes}
        switch={toggleScreen}
      />
    );
  }
console.log(selectedCall)

  let page;

  if (loading) {
    page = <LoadingPage />;
  }
  else if (display === true) {
    page = (
      <div>
        <h3>Activity feed</h3>
        {Main}
      </div>
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