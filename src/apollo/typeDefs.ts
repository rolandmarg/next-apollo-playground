import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  directive @auth on OBJECT | FIELD_DEFINITION

  type User {
    id: ID!
    email: String!
    createdAt: Date!
  }

  type CalendarEvent {
    id: ID!
    title: String!
    start: Date!
    end: Date!
  }

  input CreateCalendarEventInput {
    title: String!
    start: Date!
    end: Date!
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
    user: User
  }

  type SignInPayload {
    user: User
    token: String
  }

  type CreateCalendarEventPayload {
    calendarEvent: CalendarEvent
  }

  type Query {
    user(id: ID!): User
    users: [User]!
    viewer: User @auth
    calendarEvents: [CalendarEvent]!
    calendarEvent(id: ID!): CalendarEvent
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    createCalendarEvent(
      input: CreateCalendarEventInput!
    ): CreateCalendarEventPayload!
  }
`;
