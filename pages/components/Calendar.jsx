import React from 'react'
import useSWR from 'swr'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const parseEventData = (data) => {
  return data.map((event) => {
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
    }
  })
}

export default function MyCalendar() {
  const { data, error, mutate } = useSWR(
    'http://localhost:4000/calendarEvent',
    fetcher
  )
  if (error) {
    return <div>failed to load </div>
  }
  if (!data) return <div>loading...</div>

  const handleSelect = ({ start, end }) => {
    // eslint-disable-next-line no-alert, no-undef
    const title = window.prompt('please enter a name')
    if (title) {
      fetch('http://localhost:4000/calendarEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, start, end }),
      }).then(() => {
        mutate([...data, { title, start, end }])
      })
    }
  }

  return (
    <div>
      <Calendar
        selectable
        defaultDate={moment().toDate()}
        defaultView="week"
        events={parseEventData(data)}
        localizer={localizer}
        style={{ height: '100vh' }}
        dayLayoutAlgorithm="no-overlap"
        onSelectSlot={handleSelect}
      />
    </div>
  )
}
