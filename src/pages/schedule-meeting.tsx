import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import NavBar from '../components/Navbar'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  CalendarEventsQuery,
  CalendarEventsQueryVariables,
  CreateCalendarEventMutation,
  CreateCalendarEventMutationVariables,
} from '../__generated__/types'

const localizer = momentLocalizer(moment)

interface CalendarSlotInfo {
  start: string | Date
  end: string | Date
}

const CALENDAR_EVENTS = gql`
  query CalendarEvents {
    calendarEvents {
      id
      title
      start
      end
    }
  }
`

const CREATE_CALENDAR_EVENTS = gql`
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
`

export default function ScheduleMeeting() {
  const { data, error } = useQuery<
    CalendarEventsQuery,
    CalendarEventsQueryVariables
  >(CALENDAR_EVENTS)
  const [createCalendarEvents, { error: mutationError }] = useMutation<
    CreateCalendarEventMutation,
    CreateCalendarEventMutationVariables
  >(CREATE_CALENDAR_EVENTS, {
    update: (cache, { data }) => {
      const createdEvent = data?.createCalendarEvent.calendarEvent

      if (!createdEvent) {
        return
      }

      const events = cache.readQuery<CalendarEventsQuery>({
        query: CALENDAR_EVENTS,
      })

      const existingEvents = events?.calendarEvents || []

      cache.writeQuery({
        query: CALENDAR_EVENTS,
        data: {
          calendarEvents: [...existingEvents, createdEvent],
        },
      })
    },
  })

  const handleSelect = ({ start, end }: CalendarSlotInfo) => {
    // eslint-disable-next-line no-alert, no-undef
    const title = window.prompt('please enter a name')
    if (!title) {
      return
    }
    createCalendarEvents({
      variables: {
        title,
        start: new Date(start),
        end: new Date(end),
      },
    })
  }

  const parseData = (data: CalendarEventsQuery) =>
    data.calendarEvents.map((event) => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
  return (
    <>
      <NavBar />
      {error && <p>{error.message}</p>}
      {mutationError && <p>{mutationError.message}</p>}
      {data && (
        <Calendar
          selectable
          defaultDate={moment().toDate()}
          defaultView="week"
          events={parseData(data)}
          localizer={localizer}
          // style={{ height: '100vh' }}
          dayLayoutAlgorithm="no-overlap"
          onSelectSlot={handleSelect}
        />
      )}
    </>
  )
}
