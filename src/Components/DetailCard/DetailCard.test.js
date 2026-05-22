import React from "react";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import DetailCard from "./DetailCard";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";



test("Detail Card renders Correctly", () => {


    render(<DetailCard
        date="2025-04-10T14:32:00Z"
        from="+33 6 12 34 56 78"
        to="+33 1 23 45 67 89"
        status="inbound"
        duration="120"
        notes=""
    />)


    expect(screen.getByText("+33 1 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("No notes available")).toBeInTheDocument();
    //Pws mporw na perasw notes?
    expect(screen.getByText(/INBOUnd/i))
    expect(screen.getByText(/120/))
    //Me ""to 120 varaei episis to exw dilwsei san text enw san prop to pernaw number

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
