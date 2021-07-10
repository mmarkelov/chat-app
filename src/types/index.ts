import { CHANNELS, USERS } from "../const";

const CHANNELS_KEYS = CHANNELS.map(({ value }) => value);

type User = typeof USERS[number];
type Channel = typeof CHANNELS_KEYS[number];

type MessageItem = {
  messageId: string;
  userId: string;
  text: string;
  datetime: Date;
};

type GetLatestMessages = {
  fetchLatestMessages: MessageItem[];
};

type GetLatestMessagesVars = {
  channelId: string;
};

type GetMessages = {
  fetchMoreMessages: MessageItem[];
};

type GetMessagesVars = GetLatestMessagesVars & {
  messageId: string;
  old: boolean;
};

export type {
  User,
  Channel,
  MessageItem,
  GetLatestMessages,
  GetLatestMessagesVars,
  GetMessages,
  GetMessagesVars,
};
