import packageJSON from "../../../package.json";

export default {
  Query: {
    apiInfo: () => ({
      name: packageJSON.name,
      version: packageJSON.version,
      description: packageJSON.description,
    }),
  },
};
