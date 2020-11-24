import packageJSON from "../../package.json";

export const rootRoute = (_, res) => {
  return res.status(200).json({
    name: packageJSON.name,
    version: packageJSON.version,
    description: packageJSON.description
  });
};
