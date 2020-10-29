const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

const { getUser } = require('./services');

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  },
});

const app = express();
app.use(helmet());
app.use(cors());

server.applyMiddleware({ app, path: '/api' });

db.connect(process.env.DB_HOST);

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
