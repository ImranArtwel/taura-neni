const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    pic: String
  }

  type Message {
    id: ID!
    content: String!
    chat: Chat
    sender: User!
    readBy: [User]
  }

  type Chat {
    id: ID
    name: String
    isGroupChat: Boolean
    latestMessage: Message
    users: [User]
    groupAdmin: User
  }

  input UserSearchInput {
    name: String
  }

  input UserCreateInput {
    name: String!
    email: String!
    password: String!
    pic: String
  }

  type UserResponse {
    id: ID
    name: String
    email: String
    isAdmin: Boolean
    pic: String
    token: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input MessageCreateUserInput {
    name: String!
    email: String!
    pic: String
  }

  input NewMessageInput {
    sender: MessageCreateUserInput!
    content: String!
    chatId: Int
  }

  input UserInput {
    id: ID
    name: String!
    email: String!
    isAdmin: Boolean
    pic: String
  }

  input NewGroupChatInput {
    chatName: String
    users: [UserInput]
    isGroupChat: Boolean
    groupAdmin: UserInput
  }

  type Query {
    getAllUsers(input: UserSearchInput): [UserResponse]
  }

  type Mutation {
    createUser(input: UserCreateInput!): UserResponse!
  }
`;
module.exports = typeDefs;
