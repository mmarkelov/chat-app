import React from "react";
import styled from "styled-components";
import { CHANNELS } from "../../const";
import { Channel } from "../../types";

type Props = {
  currentChannel: Channel;
  setChannel: (channel: Channel) => void;
};

const ChannelList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ChannelListItem = styled.li<{ selected: boolean }>`
  padding: 1rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#ffffff" : "initial")};

  &:hover {
    background-color: #ffffff;
    background-image: -webkit-linear-gradient(right, #e9eff5, #ffffff);
  }
`;

const ChannelSelector = ({ currentChannel, setChannel }: Props) => {
  const handleClick = (value: Channel) => () => setChannel(value);
  return (
    <ChannelList>
      {CHANNELS.map(({ title, value }) => (
        <ChannelListItem
          key={value}
          selected={value === currentChannel}
          onClick={handleClick(value)}
        >
          {title} Channel
        </ChannelListItem>
      ))}
    </ChannelList>
  );
};

export default ChannelSelector;
