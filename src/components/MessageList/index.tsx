import {
  Channel,
  GetLatestMessages,
  GetLatestMessagesVars,
  MessageItem,
  User,
} from "../../types";
import { useQuery } from "@apollo/client";
import { GET_LATEST_MESSAGES } from "../../queries";
import styled from "styled-components";
import Message from "../Message";
import { memo } from "react";

type Props = {
  channelId: Channel;
  currentUser: User;
};

const Preloader = styled.div`
  display: flex;
  justify-content: center;
`;

const MessageListContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const MessageList = ({ channelId, currentUser }: Props) => {
  const { loading, error, data } = useQuery<
    GetLatestMessages,
    GetLatestMessagesVars
  >(GET_LATEST_MESSAGES, {
    variables: { channelId },
  });

  const getContent = () => {
    if (loading) {
      return (
        <Preloader>
          <i className="fas fa-spinner fa-pulse fa-3x" />
        </Preloader>
      );
    }
    if (data) {
      return [...data.fetchLatestMessages]
        .reverse()
        .map((message) => (
          <Message
            right={message.userId !== currentUser}
            key={message.messageId}
            {...message}
          />
        ));
    }
  };

  return <MessageListContainer>{getContent()}</MessageListContainer>;
};

export default memo(MessageList);
