const { ApolloServer, AuthenticationError } = require("apollo-server");
const jsonServer = require("json-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { DataAPI } = require("./API");
//const cors = require('cors')
const { JWT } = require("./utils");
const axios = require("axios");
const { URL } = require("./constants");
const { path } = require("ramda");
const { makeExecutableSchema } = require("graphql-tools");
const nodepath = require("path");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const dataAPI = new DataAPI();
const PORT = 4000;
const WS_PORT = 4001;
const DB_PORT = 1234;
const schema = makeExecutableSchema({ typeDefs, resolvers });

// JSON server
const DBServer = jsonServer.create();
const router = jsonServer.router(nodepath.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({ logger: false });
DBServer.use(middlewares);
DBServer.use(router);

// Apollo server: queries and mutations
const server = new ApolloServer({
  schema,
  dataSources: () => ({
    dataAPI
  }),
  context: async ({ req }) => {
    // get the user token from the headers
    const token = path(["headers", "authorization"], req);
    let user;
    if (token) {
      try {
        const { id } = JWT.decode(token);
        user = (await axios.get(`${URL}/users/${id}`)).data;
      } catch (e) {
        return new AuthenticationError();
      }
    }
    // add the user to the context
    return { user };
  },
  subscriptions: false
});

// Apollo server for subscriptions
const ws = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Time to listen on numerous ports!!
DBServer.listen(DB_PORT, () => {
  console.log(`🦄 JSON Server ready at localhost:${DB_PORT}`);
});

ws.listen({ port: WS_PORT }, () => {
  console.log(
    `🐥 Subscriptions Server ready at localhost:${WS_PORT}/subscriptions`
  );
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      // we need to pass the dataloader in the context as well!!
      onConnect: async () => ({
        dataSources: { dataAPI }
      })
    },
    {
      server: ws,
      path: "/subscriptions"
    }
  );
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🐱 Server ready at ${url}`);
});
