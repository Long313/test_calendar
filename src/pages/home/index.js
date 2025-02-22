import dayjs from "dayjs";
import './home.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from "react";
import Calendar from "../../components/Calendar";
import Event from "../../components/Event/Event";
import Loading from "../../components/Loading";

function Home() {
    const today = dayjs().format("DD MMM");
    const [data, setData] = useState([]);
    const [dataFull, setDataFull] = useState([]);
    const [dataCalendar, setDataCalendar] = useState([]);
    const [status, setStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    function convertToYYYYMMDD(isoString) {
        const date = new Date(isoString);
        const options = { timeZone: 'Asia/Shanghai' };
        const year = date.toLocaleString('en-US', { year: 'numeric', ...options });
        const month = date.toLocaleString('en-US', { month: '2-digit', ...options });
        const day = date.toLocaleString('en-US', { day: '2-digit', ...options });
        return `${year}-${month}-${day}`;
    }
    const addSeq = (listData) => {
        const data = listData.map((item, index) => {
            return { ...item, seq: index + 1 };
        })
        return data
    }
    const handleSliceData = (data) => {
        const now = convertToYYYYMMDD(new Date());
        let newList = data.filter((item) => {
            const fromDate = convertToYYYYMMDD(item.from);
            return fromDate === now;
        })
        newList = addSeq(newList);
        setDataFull(newList);
        let sliceData = newList.slice(0, 3);
        sliceData = addSeq(sliceData);
        setData(sliceData);
    }
    const getData = async () => {
        await fetch('https://aws-seven-self.vercel.app/api/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                const data = await response.json();
                handleSliceData(data.data)
                console.log("Data---", data.data);
                setDataCalendar(addSeq(data.data))
                setIsLoading(false)
            }
            )
            .catch(error => console.error('Lỗi:', error));
    }
    useEffect(() => {
        getData();
    }, [])

    const handleStatus = () => {
        setStatus(!status);
    }
    return (
    <div className="App">
      {isLoading ? (<Loading/>) :
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
          {dataCalendar.length > 0 && <Calendar data={dataCalendar}/>}
        </div>
      </div>)}
    </div>
    );
}

export default Home;
