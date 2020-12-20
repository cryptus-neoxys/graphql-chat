const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const { JWT_SECRET } = require("../config/env.json");

module.exports = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split("Bearer ")[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split("Bearer ")[1];
  }

  context.pubsub = pubsub;

  if (token) {
    jwt.verify(token, JWT_SECRET, (_, decodedToken) => {
      context.user = decodedToken;
    });
  }
  return context;
};
