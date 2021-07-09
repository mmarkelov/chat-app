import React, { useState } from "react";
import styled from "styled-components";
import { ApolloError, useMutation } from "@apollo/client";
import { CHANNELS, USERS } from "./const";
import { User, Channel } from "./types";
import { POST_MESSAGE } from "./mutations";
import Header from "./components/Header";
import UserSelector from "./components/UserSelector";
import ChannelSelector from "./components/ChannelSelector";
import MessageList from "./components/MessageList";
import { GET_LATEST_MESSAGES } from "./queries";

const Container = styled.div`
  margin-left: 5%;
  margin-right: 5%;
`;

const Content = styled.div`
  display: flex;
  background-color: rgb(244, 245, 251);
  padding-bottom: 1rem;
`;

const SelectorsWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  border-right: 1px solid #e6ecf3;
`;

const ChatWrapper = styled.div`
  flex: 2;
`;

const SelectorItem = styled.div`
  margin-bottom: 1rem;
`;

const SelectorTitle = styled.div`
  margin-bottom: 0.5rem;
`;

const ChannelTitle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e6ecf3;
`;

const CurrentTime = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

const TextAreaWrapper = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  resize: vertical;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  color: #fff;
  background-color: ${({ disabled }) => (disabled ? "#cccccc" : "#17a2b8")};
  border: 1px solid;
  border-color: ${({ disabled }) => (disabled ? "#cccccc" : "#17a2b8")};
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  float: right;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

function App() {
  const [user, setUser] = useState<User>(USERS[0]);
  const [channel, setChannel] = useState<Channel>(CHANNELS[0].value);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const [postMessage, { loading }] = useMutation(POST_MESSAGE, {
    onError: () => {
      setError(true);
    },
    refetchQueries: [
      {
        query: GET_LATEST_MESSAGES,
        variables: {
          channelId: channel,
        },
      },
    ],
  });

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    postMessage({
      variables: { channelId: channel, text, userId: user },
    });
    setText("");
  };

  const channelTitle = `${
    CHANNELS.find(({ value }) => value === channel)?.title
  } Channel`;

  return (
    <Container>
      <Header />
      <Content>
        <SelectorsWrapper>
          <SelectorItem>
            <SelectorTitle>Choose your user</SelectorTitle>
            <UserSelector currentUser={user} setUser={setUser} />
          </SelectorItem>
          <SelectorItem>
            <SelectorTitle>Choose your channel</SelectorTitle>
            <ChannelSelector currentChannel={channel} setChannel={setChannel} />
          </SelectorItem>
        </SelectorsWrapper>
        <ChatWrapper>
          <ChannelTitle>{channelTitle}</ChannelTitle>
          <CurrentTime>{new Date().toLocaleDateString()}</CurrentTime>
          <MessageList channelId={channel} currentUser={user} />
          <TextAreaWrapper>
            <Textarea
              value={text}
              onChange={handleTextInput}
              placeholder="Type your message here..."
              rows={3}
            />
            {error && <div>Error!</div>}
            <Button disabled={loading || !text} onClick={handleSubmit}>
              {loading ? (
                <i className="fas fa-spinner fa-pulse" />
              ) : (
                <>
                  Send Message <i className="fa fa-send fa-paper-plane" />
                </>
              )}
            </Button>
          </TextAreaWrapper>
        </ChatWrapper>
      </Content>
    </Container>
  );
}

export default App;
