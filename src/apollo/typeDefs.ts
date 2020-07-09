import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type Error {
    msg: String!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    error: Error
    user: User
  }

  type SignInPayload {
    error: Error
    user: User
    token: String
  }

  type Query {
    user(id: ID!): User
    users: [User]!
    viewer: User
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
  }
`;
