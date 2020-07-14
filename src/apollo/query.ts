import { gql } from '@apollo/client';

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
