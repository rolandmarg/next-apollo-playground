import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import NavBar from '../components/Navbar'
import {
  useCalendarEventsQuery,
  useCreateCalendarEventMutation,
  CalendarEventsQuery,
  CalendarEventsDocument,
} from '../__generated__/react-apollo.d'

const localizer = momentLocalizer(moment)

interface CalendarSlotInfo {
  start: string | Date
  end: string | Date
}

export default function ScheduleMeeting() {
  const { data, error } = useCalendarEventsQuery()

  const [
    createCalendarEvents,
    { error: mutationError },
  ] = useCreateCalendarEventMutation({
    update: (cache, { data }) => {
      const createdEvent = data?.createCalendarEvent.calendarEvent

      if (!createdEvent) {
        return
      }

      const events = cache.readQuery<CalendarEventsQuery>({
        query: CalendarEventsDocument,
      })

      const existingEvents = events?.calendarEvents || []

      cache.writeQuery({
        query: CalendarEventsDocument,
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
