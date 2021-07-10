import Message from "../components/Message";
import { render, screen } from "@testing-library/react";
import { API, USERS } from "../const";

describe("Message", () => {
  const userId = USERS[0];
  const commonProps = {
    messageId: "1",
    userId,
    datetime: new Date("2021-07-10T03:24:00"),
  };

  it("renders right component", () => {
    render(<Message {...commonProps} text="test" />);
    const avatar = screen.getByAltText(`preview-${userId}`);
    const text = screen.getByText("test");
    const time = screen.getByText("3:24");
    expect(avatar).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", `${API}/${userId}.png`);
  });
});
