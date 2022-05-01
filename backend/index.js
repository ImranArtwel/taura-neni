const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const { protect } = require("./middleware/auth");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// initialize the app
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(protect);
app.use(express.json());

// define server
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: true,
  context: ({ req, res }) => {
    let { user, isAuth } = req;
    return {
      req,
      res,
      user,
      isAuth,
    };
  },
});

const startApp = async () => {
  try {
    await connectDB();
    await server.start();
    app.listen(
      PORT,
      console.log(`Server running on PORT ${PORT}...`.yellow.bold)
    );
    server.applyMiddleware({
      app,
      cors: true,
    });
  } catch (err) {
    console.log("error", err);
  }
};

startApp();
