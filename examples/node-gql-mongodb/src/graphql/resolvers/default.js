import packageJSON from "../../../package.json";

const resolvers = {
  Query: {
    apiInfo: () => ({
      name: packageJSON.name,
      version: packageJSON.version,
      description: packageJSON.description,
    }),
  },
};

export default resolvers;
