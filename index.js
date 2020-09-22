const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const db = require('./db');
require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./src/resolvers");
const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const app = express();

server.applyMiddleware({ app, path: "/api" });

db.connect(process.env.DB_HOST);

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
