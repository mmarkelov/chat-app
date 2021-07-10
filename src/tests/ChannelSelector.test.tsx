import ChannelSelector from "../components/ChannelSelector";
import { render, screen, fireEvent } from "@testing-library/react";
import { CHANNELS } from "../const";

describe("ChannelSelector", () => {
  const mockFn = jest.fn();
  it("renders right component", () => {
    render(
      <ChannelSelector currentChannel={CHANNELS[0].value} setChannel={mockFn} />
    );

    const items = screen.getAllByRole("listitem");
    const selectedChannel = screen.getByText(`${CHANNELS[0].title} Channel`);

    expect(items).toHaveLength(CHANNELS.length);
    expect(selectedChannel).toHaveProperty("selected");
  });

  it("calls setChannel", () => {
    render(
      <ChannelSelector currentChannel={CHANNELS[0].value} setChannel={mockFn} />
    );

    const newChannel = screen.getByText(`${CHANNELS[2].title} Channel`);

    fireEvent.click(newChannel);

    expect(mockFn).toHaveBeenCalledWith(CHANNELS[2].value);
  });
});
