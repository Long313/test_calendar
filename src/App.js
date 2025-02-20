import dayjs from "dayjs";
import logo from './logo.svg';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Event from "./components/Event";
import { useEffect, useState } from "react";

function App() {
  const today = dayjs().format("DD MMM");
  const [data, setData] = useState({});
  const getData = async () => {
    await fetch('https://www.eventbrite.sg/api/v3/destination/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 4RAU3YVXGZCZNOSQYXIV'
      },
      body: JSON.stringify({ "event_search": { "page_size": 30, "image": true, "places": ["85680809"], "dates": ["current_future"], "dedup": true }, "expand.destination_event": ["primary_venue", "image", "ticket_availability", "saves", "event_sales_status", "primary_organizer", "public_collections"], "browse_surface": "homepage" })
    })
      .then(response => setData(response.json()))
      .then(data => console.log('Thành công:', data))
      .catch(error => console.error('Lỗi:', error));
  }
  useEffect(() => {
    getData();
  },[])
  return (
    <div className="App">
      <div className="container">
        <div className="left_container">
          <div className="container_calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </div>
          <div className="container_event">
            <div className="header">
              <div className="left">Upcoming Event</div>
              <div className="right">View All</div>
            </div>
            <div className="today">
              Today, {today}
            </div>
            <div className="event_container">
              <Event />
            </div>

          </div>
        </div>
        <div className="right_container"></div>
      </div>
    </div>
  );
}

export default App;
