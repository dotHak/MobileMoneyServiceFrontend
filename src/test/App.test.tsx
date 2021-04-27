import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Component rendered successfully", () => {
    render(<App />);
    const linkElement = screen.getByText(/Mobile Money Service/i);
    expect(linkElement).toBeInTheDocument();
});
