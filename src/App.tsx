import React, { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import UserSelector from "./components/UserSelector";
import ChannelSelector from "./components/ChannelSelector";
import Message from "./components/Message";
import { CHANNELS, USERS } from "./const";
import { User, Channel } from "./types";

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
  background-color: #17a2b8;
  border: 1px solid #17a2b8;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  float: right;
  cursor: pointer;
`;

function App() {
  const [user, setUser] = useState<User>(USERS[0]);
  const [channel, setChannel] = useState<Channel>(CHANNELS[0].value);
  const [text, setText] = useState("");

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
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
          <Message
            userName={USERS[0]}
            text="Hello, I'm Russell."
            time="08:55"
            status="ok"
          />
          <Message
            userName={USERS[1]}
            text="I need more information about Developer Plan."
            time="08:55"
          />
          <Message
            userName={USERS[2]}
            text={"Line one\nLine two\nLine three"}
            time="08:55"
            status="err"
          />
          <Message
            userName={USERS[0]}
            text="I need more information about Developer Plan."
            time="08:55"
            right
            status="ok"
          />
          <TextAreaWrapper>
            <Textarea
              value={text}
              onChange={handleTextInput}
              placeholder="Type your message here..."
              rows={3}
            />
            <Button>
              Send Message <i className="fa fa-send fa-paper-plane" />
            </Button>
          </TextAreaWrapper>
        </ChatWrapper>
      </Content>
    </Container>
  );
}

export default App;
