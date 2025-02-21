import dayjs from "dayjs";
import logo from './logo.svg';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Event from "./components/Event/Event";
import Calendar from "./components/Calendar/Calendar";
import { useEffect, useState } from "react";

function App() {
  const today = dayjs().format("DD MMM");
  const [data, setData] = useState([]);
  const [dataFull, setDataFull] = useState([]);
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSliceData = (data) => {
    const newArr = data.slice(0, 3);
    setData(newArr);
  } 
  const getData = async () => {
    await fetch('https://aws-seven-self.vercel.app/api/hello', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async response => {
        const data = await response.json();
        setDataFull(data.data)
        handleSliceData(data.data)
        setIsLoading(false)
      }
      )
      .catch(error => console.error('Lỗi:', error));
  }
  useEffect(() => {
    getData();
  },[])

  const handleStatus = () => {
    setStatus(!status);
  }
  return (
    <div className="App">
      {isLoading ? (<div className="loading">Loading ...</div>) :
      (<div className="container">
        <div className="left_container">
          <div className="container_calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </div>
          <div className="container_event_comming">
            <div className="header">
              <div className="left">Upcoming Event</div>
              <div className="right" onClick={() => handleStatus()}>{!status ? "View All" : "View Some Item"}</div>
            </div>
            <div className="today">
              Today, {today}
            </div>
            <div className={`event_container`}>
              {data.length > 0 && data.map((event) => 
                  <Event data={event} key={event.id}/>
              )
              }
              {status && dataFull.length > 0 && dataFull.map((event) => 
                  <Event data={event} key={event.id}/>
              )}
            </div>

          </div>
        </div>
        <div className="right_container">
          <Calendar/>
        </div>
      </div>)}
    </div>
  );
}

export default App;
