import {
  Channel,
  GetLatestMessages,
  GetLatestMessagesVars,
  GetMessages,
  GetMessagesVars,
  MessageItem,
  User,
} from "../../types";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_LATEST_MESSAGES, GET_MESSAGES } from "../../queries";
import styled from "styled-components";
import Message from "../Message";
import { memo, useEffect, useState } from "react";
import Button from "../Button";

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

const NoMessages = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PAGE_SIZE = 10;

const MessageList = ({ channelId, currentUser }: Props) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, data } = useQuery<GetLatestMessages, GetLatestMessagesVars>(
    GET_LATEST_MESSAGES,
    {
      variables: { channelId },
    }
  );

  const [loadMessages, { loading: messageLoading, data: messageData }] =
    useLazyQuery<GetMessages, GetMessagesVars>(GET_MESSAGES);

  useEffect(() => {
    if (data?.fetchLatestMessages) {
      const newMessages = [...data.fetchLatestMessages];
      setMessages(newMessages);
      setCurrentPage(1);
    }
  }, [data]);

  useEffect(() => {
    if (messageData?.fetchMoreMessages) {
      setMessages((prevState) => [
        ...prevState,
        ...messageData.fetchMoreMessages,
      ]);
    }
  }, [messageData]);

  const handleClick = () => {
    setCurrentPage((prevState) => prevState + 1);
    loadMessages({
      variables: {
        channelId,
        messageId: messages[messages.length - 1].messageId,
        old: true,
      },
    });
  };

  const getContent = () => {
    if (loading || messageLoading) {
      return (
        <Preloader>
          <i className="fas fa-spinner fa-pulse fa-3x" />
        </Preloader>
      );
    }
    if (messages) {
      return (
        <>
          {messages.length === currentPage * PAGE_SIZE && (
            <ButtonContainer>
              <Button onClick={handleClick}>
                Read More <i className="fa fa-arrow-up" />
              </Button>
            </ButtonContainer>
          )}
          {messages.length ? (
            [...messages]
              .reverse()
              .map((message) => (
                <Message
                  right={message.userId !== currentUser}
                  key={message.messageId}
                  {...message}
                />
              ))
          ) : (
            <NoMessages>You don't have any messages in this channel</NoMessages>
          )}
        </>
      );
    }
  };

  return <MessageListContainer>{getContent()}</MessageListContainer>;
};

export default memo(MessageList);
