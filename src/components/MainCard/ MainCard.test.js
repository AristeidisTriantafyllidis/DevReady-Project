import React from "react";
import { render, screen } from "@testing-library/react";
import MainCard from "./MainCard";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";

const givenDate="2025-04-10T14:32:00Z"

test("Find Button", () => {
  render(<MainCard
    date={givenDate}
    
  />)
  const Btn = screen.getByRole("button", { name: /Archive/i })
  expect(Btn).toBeInTheDocument();
})

test("Archiving a call removes it from the activity feed", async () => {
  const deleteCall = jest.fn()
  render(<MainCard
    date={givenDate}
    deleteCall={deleteCall}
    id="1"
/>)

  const Btn = screen.getByRole("button", { name: /Archive/i })
  await userEvent.click(Btn)
  expect(deleteCall).toHaveBeenCalledWith("1")
  await userEvent.click(Btn)
  expect(deleteCall).toHaveBeenCalledTimes(2)

})

test("Checking date",()=>{

  render(<MainCard
 date={givenDate}

  />)
expect(screen.getByText("2025-04-10"))
expect(screen.getByText("14:32:00"))

})
