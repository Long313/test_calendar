import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react';
import './calendar.css'
import { SiHandlebarsdotjs } from "react-icons/si";

const events = [
    { title: 'Meeting', start: new Date() }
]

// const eventStyle = {
//     display: "inline-block",
//     maxWidth: "100%",
//     overflow: "hidden",
//     verticalAlign: "top",
//     whiteSpace: "nowrap",
//     textOverflow: "ellipsis",
//     width: "103px"
// };
// const eventList = { title: 'event 1', date: '2019-04-01' }
export default function Calendar({ data }) {
    const [list, setList] = useState([]);
    function convertToYYYYMMDD(isoString) {
        const date = new Date(isoString);
        const options = { timeZone: 'Asia/Shanghai' };
        const year = date.toLocaleString('en-US', { year: 'numeric', ...options });
        const month = date.toLocaleString('en-US', { month: '2-digit', ...options });
        const day = date.toLocaleString('en-US', { day: '2-digit', ...options });
        return `${year}-${month}-${day}`;
    }
    const navigate = useNavigate();

    function renderEventContent(eventInfo) {
        const calSeq = (seq) => {
            if (seq % 3 === 0) {
                return "change_background"
            }
        }
        return (
            <div className={`item_event container_item_event ${eventInfo.type} ${calSeq(eventInfo.seq)}`} >
                <i className="date">{eventInfo?.date}</i>
                <b className={`title ${calSeq(eventInfo.seq)}`}>{eventInfo?.title}</b>
            </div>
        )
    }

    const formatData = (data) => {
        const newList = data?.map((item) => {
            const fromDate = convertToYYYYMMDD(item.from);
            const toDate = convertToYYYYMMDD(item.to);
            return {
                title: item.name,
                // type: item.type,
                date: fromDate,
                extendedProps: {
                    id: item.id,
                    type: item.type,
                    name: item.name,
                    from: convertToYYYYMMDD(item.from),
                    to: convertToYYYYMMDD(item.to),
                    location: item.location,
                    ticketPrice: item.ticketPrice,
                    host: item.host,
                    followers: item.followers,
                    image: item.image,
                    client: {
                        avatar: item.client.avatar,
                        name: item.client.name,
                        age: item.client.age,
                        address: item.client.age
                    }

                }
            }
        })
        setList(newList);
    }
    useEffect(() => {
        if (data.length > 0) {
            formatData(data);
        }
    }, [data])
    const fillData = (list) => {
        for (let i = 0; i < list?.length; i++) {
            renderEventContent(list[i]);
        }
    }
    useEffect(() => {
        if (list.length > 0) {
            fillData(list);
        }
    }, [list])
    const handeNavigate = (data) => {
        const id = data.event.extendedProps.id;
        navigate(`/detail/${id}`);
    }
    return (
        <div>
            {list.length > 0 && <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={list}
                eventContent={fillData()}
                eventClick={(info) => handeNavigate(info)}
            />}
        </div>
    )
}

