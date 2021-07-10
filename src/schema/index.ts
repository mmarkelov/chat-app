import { gql } from "@apollo/client";

const typeDefs = gql`
  type Message {
    messageId: String!
    text: String!
    datetime: String!
    userId: String!
  }

  type Query {
    fetchLatestMessages(channelId: String!): [Message]
    fetchMoreMessages(
      channelId: String!
      messageId: String!
      old: Boolean!
    ): [Message]
  }

  type Mutation {
    postMessage(channelId: String!, text: String!, userId: String!): Message
  }
`;

export default typeDefs;
