import gql from "graphql-tag";

export default gql`
  type Query {
    apiInfo: APIInfo!
  }

  type APIInfo {
    name: String!
    version: String!
    description: String!
  }
`;
