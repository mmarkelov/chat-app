import Button from "../components/Button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button", () => {
  it("renders basic button", () => {
    render(<Button>test</Button>);
    const buttonElement = screen.getByText("test");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders disabled button", () => {
    render(<Button disabled>disabled</Button>);
    const buttonElement = screen.getByText("disabled");
    expect(buttonElement).toBeDisabled();
  });

  it("calls onClick", () => {
    const mockFn = jest.fn();
    render(<Button onClick={mockFn}>test</Button>);
    const buttonElement = screen.getByText("test");
    fireEvent.click(buttonElement);
    expect(mockFn).toBeCalled();
  });
});
