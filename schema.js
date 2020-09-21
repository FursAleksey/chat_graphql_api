const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    newMessage(content: String!): Message!
  }
`;

module.exports = typeDefs;
