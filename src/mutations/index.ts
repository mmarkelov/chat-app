import { gql } from "@apollo/client";

const POST_MESSAGE = gql`
  mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export { POST_MESSAGE };
