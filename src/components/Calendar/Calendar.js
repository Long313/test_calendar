import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const events = [
  { title: 'Meeting', start: new Date() }
]
const eventList = { title: 'event 1', date: '2019-04-01' }
export default function Calendar() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        eventContent={renderEventContent(eventList)}
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {

  return (
    <>
      <b>{eventInfo.date}</b>
      <i>{eventInfo.title}</i>
    </>
  )
}