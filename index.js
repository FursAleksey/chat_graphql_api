const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./src/resolvers');
const models = require('./src/models');
const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);
    // add the db models and the user to the context
    return { models, user };
  },
});
const app = express();
app.use(helmet());
app.use(cors());

server.applyMiddleware({ app, path: '/api' });

db.connect(process.env.DB_HOST);

const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error('Session invalid');
    }
  }
};

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
