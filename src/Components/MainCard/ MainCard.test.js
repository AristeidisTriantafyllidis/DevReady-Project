import React from "react";
import { render, screen } from "@testing-library/react";
import MainCard from "./MainCard";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";


test("Find Button", () => {
  render(<MainCard
    date="22/5/2026"
  />)
  const Btn = screen.getByRole("button", { name: /Archive/i })
  expect(Btn).toBeInTheDocument();
})

test("Click button", async () => {
  const deleteCall = jest.fn()
  render(<MainCard
    date="22/5/2026"
    deleteCall={deleteCall}


  />)
  const Btn = screen.getByRole("button", { name: /Archive/i })
  await userEvent.click(Btn)
  expect(deleteCall).toHaveBeenCalledTimes(1)
  await userEvent.click(Btn)
  expect(deleteCall).toHaveBeenCalledTimes(2)

})


