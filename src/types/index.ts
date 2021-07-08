import { CHANNELS, USERS } from "../const";

const CHANNELS_KEYS = CHANNELS.map(({ value }) => value);

type User = typeof USERS[number];
type Channel = typeof CHANNELS_KEYS[number];

export type { User, Channel };
