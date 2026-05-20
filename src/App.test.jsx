import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import React from 'react';



test('renders call center header', () => {
  render(<App />);
  const headerElement = screen.getByText(/call center/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders call type',() =>{
  render(<App />);
  const activity = screen.getByText(/call type/i);
  expect(activity).toBeInTheDocument();
})

test ('renders your page is loading',()=>{
  render(<App />)
  const loading=screen.getByText(/Your page is loading/i)
expect(loading).toBeInTheDocument();
})

test('renders activity feed',async ()=>{
  render(<App />)
  await screen.findByText(/Activity feed/i,{timeout:8000})
  expect(screen.getByText(/Activity feed/i)).toBeInTheDocument
 
})

const mockData= {
      calls:[
        {
        "id": "1",
        "direction": "inbound",
        "from": "+33 6 12 34 56 78",
        "to": "+33 1 23 45 67 89",
        "call_type": "answered",
        "duration": 120,
        "is_archived": false,
        "created_at": "2025-04-10T14:32:00Z"
    }
  ]}
test ('List renders succeessfully',async ()=>{
  render(<App allCalls={mockData}/>)
  await screen.findByText("+33 6 12 34 56 78",{timeout:8000})
  expect(screen.getByText("+33 6 12 34 56 78")).toBeInTheDocument();
  
})

