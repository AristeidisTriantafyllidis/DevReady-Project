import React from 'react';
import './App.css';
import Header from './Components/Header';
import MainCard from './Components/MainCard/MainCard';
import DetailCard from './Components/DetailCard/DetailCard';
import LoadingPage from './LoadingErrors/LoadingPage';

function App() {
  const [allCalls, setAllCalls] = React.useState(null);
  const [loading, setLoading] = React.useState(true)
  const [display, setDisplay] = React.useState(true)
  const [selectedCall, setSelectedCall] = React.useState(null)
  const [identification, setIdentification] = React.useState(null)
  const [checkboxes, setCheckBoxes] = React.useState({})

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

// .catch(err => {
//   console.error(err);
//   setLoading(false);

  }, []) 


  React.useEffect(() => {
  
    if (identification !== null) {
      
      fetch(`https://call-center-mu.vercel.app/calls/${identification}`, {
        headers: {
          "X-User-Id": "Ariss"
        }
      })
        .then(res => res.json())
        .then(data => {
             setSelectedCall(data)
        })

    }
  }, [identification])


  function toggleScreen(id) {
    setDisplay(!display)
    setIdentification(id)
     }

  function deleteCall(id) {
    const updateCalls = allCalls?.calls?.filter((item) => item.id !== id);
   
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
    
   if(Object.keys(checkboxes).length === 0 && checkboxes.constructor === Object){
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
  }
  else{
    //for
  }
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



function handleChange(e){
  const target=e.target
  const value=target.checked
  const name=target.name
setCheckBoxes(values=>({...values,[name]:value}))
}

  return (
    <div className="App">
      <Header />
      <div>
        <p>Call type</p>
      
      <label>Missed
        <input type='checkbox' name="missed"
        checked={checkboxes.missed} onChange={handleChange}/>
      </label>
      <label>Answered
        <input type='checkbox' name="answered"
        checked={checkboxes.answered} onChange={handleChange}/>
      </label>
      <label>Voicemail
        <input type='checkbox' name="voicemail"
        checked={checkboxes.voicemail} onChange={handleChange}/>
      </label>
      </div>
      <div>
        <p>Direction </p>
        <label>Inbound
        <input type='checkbox' name="inbound"
        checked={checkboxes.inbound} onChange={handleChange}/>
      </label>
        <label>Outbound
        <input type='checkbox' name="outbound"
        checked={checkboxes.outbound} onChange={handleChange}/>
      </label>
      </div>
      {page}

    </div>
  );
}

export default App;