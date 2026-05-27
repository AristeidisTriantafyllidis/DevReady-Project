import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


test('renders call center header', () => {
  render(<App />);
  const headerElement = screen.getByText(/call center/i);
  expect(headerElement).toBeInTheDocument();
});



test('renders your page is loading', () => {
  render(<App />)
  const loading = screen.getByText(/Your page is loading/i)
  expect(loading).toBeInTheDocument();
})



test('renders calls ', async () => {
  global.fetch = jest.fn()
  const mockData = {
    calls: [
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
    ]
  };
  fetch.mockResolvedValue({
    json: () => Promise.resolve(mockData)
  })
  render(<App />)
  await waitFor(() => {
    expect(screen.getByText("Activity feed")).toBeInTheDocument();
    expect(screen.getByText("+33 6 12 34 56 78")).toBeInTheDocument();
  })
})



test("Renders calls tropos 2", async () => {


  global.fetch.mockResolvedValueOnce({
    json: async () => ({
      calls: [
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
      ]

    })
  })
  render(<App
  />)

  await waitFor(() => {
    expect(screen.getByText("+33 6 12 34 56 78sss")).toBeInTheDocument();

  })

})
