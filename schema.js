const { gql } = require('apollo-server-express');

const typeDefs = gql`  
  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]!
  }
  
  type Message {
    id: ID!
    text: String!
    author: User!
    recipient: User!
  }

  type Query {
    me: User!
    user(username: String!): User!
    users: [User!]!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
    newMessage(text: String!, recipient: String!): Message!
  }
`;

module.exports = typeDefs;
