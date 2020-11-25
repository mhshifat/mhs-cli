import packageJSON from "../../../package.json";
import { Resolvers } from "../../types/generated";

const resolvers: Resolvers = {
  Query: {
    apiInfo: () => ({
      name: packageJSON.name,
      version: packageJSON.version,
      description: packageJSON.description,
    }),
  },
};

export default resolvers;
