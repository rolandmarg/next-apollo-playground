import gql from 'graphql-tag';

gql`
  query Viewer {
    viewer {
      id
      email
    }
  }
`;

gql`
  query CalendarEvents {
    calendarEvents {
      id
      title
      start
      end
    }
  }
`;
