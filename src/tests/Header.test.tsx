import Header from "../components/Header";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  it("renders right html", () => {
    render(<Header />);
    const h1 = screen.getByText("1 day chat App");
    const p = screen.getByText(/All messages will be deleted/i);
    expect(h1).toBeInTheDocument();
    expect(p).toBeInTheDocument();
  });
});
