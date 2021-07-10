import UserSelector from "../components/UserSelector";
import { fireEvent, render, screen } from "@testing-library/react";
import { USERS } from "../const";

describe("UserSelector", () => {
  const mockFn = jest.fn();
  it("renders right component", () => {
    render(<UserSelector currentUser={USERS[0]} setUser={mockFn} />);
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(USERS.length);
    expect(
      (screen.getByText(USERS[0]) as HTMLOptionElement).selected
    ).toBeTruthy();
  });

  it("calls setUser", () => {
    render(<UserSelector currentUser={USERS[0]} setUser={mockFn} />);
    const select = screen.getByPlaceholderText("Select user");
    fireEvent.change(select, { target: { value: USERS[2] } });
    expect(mockFn).toBeCalledWith(USERS[2]);
  });
});
