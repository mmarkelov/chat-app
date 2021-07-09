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
  }

  type Mutation {
    postMessage(channelId: String!, text: String!, userId: String!): Message
  }
`;

export default typeDefs;
