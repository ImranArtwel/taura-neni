const { getUsers, createUser } = require("../controllers/userControllers");

const resolvers = {
  Query: {
    getAllUsers: (parent, { input: { name } }, context) => {
      const users = getUsers(context.user, name);
      return users;
    },
  },
  Mutation: {
    createUser: async (
      parent,
      { input: { name, email, password, pic } },
      context
    ) => {
      const user = await createUser(name, email, password, pic, context.res);
      return user;
    },
  },
};

module.exports = resolvers;
