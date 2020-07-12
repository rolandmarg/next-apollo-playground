import gql from 'graphql-tag';

gql`
  mutation CreateCalendarEvent(
    $title: String!
    $start: ISODate!
    $end: ISODate!
  ) {
    createCalendarEvent(input: { title: $title, start: $start, end: $end }) {
      calendarEvent {
        id
        title
        start
        end
      }
    }
  }
`;

gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
      token
    }
  }
`;

gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;
