const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    me: User!
    user(username: String!): User!
    users: [User!]!
    messages: [Message!]!
  }

  type Mutation {
    newMessage(content: String!): Message!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;

module.exports = typeDefs;
