import { gql } from "@apollo/client";

const GET_LATEST_MESSAGES = gql`
  query GetLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      datetime
      userId
      text
    }
  }
`;

const GET_MESSAGES = gql`
  query fetchMoreMessages(
    $channelId: String!
    $messageId: String!
    $old: Boolean!
  ) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      datetime
      userId
      text
    }
  }
`;

export { GET_LATEST_MESSAGES, GET_MESSAGES };
