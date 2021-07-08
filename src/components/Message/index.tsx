import styled from "styled-components";
import { API } from "../../const";
import { User } from "../../types";

const AVATAR_SIZE = 48;

const MessageWrapper = styled.div<{ right?: boolean }>`
  display: flex;
  margin: 1rem;
  flex-direction: ${({ right }) => (right ? "row-reverse" : "row")};
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const AvatarImg = styled.img`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
`;

const UserName = styled.b`
  font-size: 0.75rem;
  color: #999999;
`;

const Text = styled.div<{ right?: boolean }>`
  position: relative;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  background: #ffffff;
  white-space: pre-wrap;

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 10px;
    right: ${({ right }) => (right ? "-20px" : "inherit")};
    left: ${({ right }) => (!right ? "-20px" : "inherit")};
    border: 10px solid;

    border-color: ${({ right }) =>
      right
        ? "transparent transparent transparent #ffffff;"
        : "transparent #ffffff transparent transparent"};
  }
`;

const Time = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  align-self: center;
`;

const StatusIcon = styled.span<{ status: Status; right?: boolean }>`
  bottom: -4px;
  right: ${({ right }) => (!right ? "-8px" : "inherit")};
  left: ${({ right }) => (right ? "-8px" : "inherit")};
  color: ${({ status }) => (status === "ok" ? "#9ec94a" : "#b71e3c")};
  position: absolute;
`;

type Status = "ok" | "err";

type Props = {
  userName: User;
  text: string;
  time: string;
  right?: boolean;
  status?: Status;
};

const Message = ({ userName, text, time, right, status }: Props) => {
  return (
    <MessageWrapper right={right}>
      <AvatarWrapper>
        <AvatarImg src={`${API}/${userName}.png`} />
        <UserName>{userName}</UserName>
      </AvatarWrapper>
      <Text right={right}>
        {text}
        {status && (
          <StatusIcon
            className={`fa fa-${
              status === "ok" ? "check" : "exclamation"
            }-circle`}
            status={status}
            right={right}
          />
        )}
      </Text>
      <Time>{time}</Time>
    </MessageWrapper>
  );
};

export default Message;