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

export { GET_LATEST_MESSAGES };
