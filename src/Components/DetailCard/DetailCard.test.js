import React from "react";
import { getByRole, render, screen } from "@testing-library/react";
import DetailCard from "./DetailCard";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";



test("Detail Card renders Correctly", () => {


    render(<DetailCard
        date="2025-04-10T14:32:00Z"
        from="+33 6 12 34 56 78"
        to="+33 1 23 45 67 89"
        direction="inbound"
        duration={120}
        notes={[{ content: "Customer asked for a callback" }]}
    />)


    expect(screen.getByText("+33 1 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("Customer asked for a callback")).toBeInTheDocument();
    expect(screen.getByText(/INBOUnd/i))
    expect(screen.getByText("120s"))
   })

test("Find button if exists", () => {

    render(<DetailCard
        date="2025-04-10T14:32:00Z"
    />)
    const btn = screen.getByRole("button", { name: "Back to calls" })
    expect(btn).toBeInTheDocument();
})

test("Button calls the function", async () => {
    const checkFunction = jest.fn()
    render(<DetailCard
        date="2025-04-10T14:32:00Z"
        switch={checkFunction}


    />)
    const btn = screen.getByRole("button", { name: "Back to calls" })
    await userEvent.click(btn)
    expect(checkFunction).toHaveBeenCalledTimes(1)
})
