import dayjs from "dayjs";
import './Event.css';
import { BsCameraVideo } from "react-icons/bs";
import { useEffect, useState } from "react";

function Event({data}) {
  const [isShow, setIsShow] = useState(false);
  const {name, from, to, client, type } = data;
  useEffect(() => {
    function convertToYYYYMMDD(isoString) {
      const date = new Date(isoString);
      const options = { timeZone: 'Asia/Shanghai' };
      const year = date.toLocaleString('en-US', { year: 'numeric', ...options });
      const month = date.toLocaleString('en-US', { month: '2-digit', ...options });
      const day = date.toLocaleString('en-US', { day: '2-digit', ...options });
      const result = `${year}-${month}-${day}`;

      const now = new Date();
      const currentYear = now.toLocaleString('en-US', { year: 'numeric', ...options });
      const currentMonth = now.toLocaleString('en-US', { month: '2-digit', ...options });
      const currentDay = now.toLocaleString('en-US', { day: '2-digit', ...options });

      const current = `${currentYear}-${currentMonth}-${currentDay}`;
      console.log("result", result);
      console.log("current", current);

      if (result === current) {
        setIsShow(true);
      }
    }

    convertToYYYYMMDD(from);
  }, [from]); // Chỉ chạy khi `from` thay đổi
  function convertToGMT8(isoString) {
    const date = new Date(isoString);
    
    return date.toLocaleString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true, 
        timeZone: 'Asia/Shanghai' 
    }) + ' GMT+8';
}
  return (
    <>
      {isShow && (
        <div className={`container_event ${type}`}>
        <div className="container_title_and_time">
          <div>
            <div className="title">{name}</div>
            <div className="time"><span>{convertToGMT8(from)}</span><span>&nbsp;&nbsp;</span><span>{convertToGMT8(to)}</span></div>
          </div>
          <div className="camera_white">
            {type !== "event" ? <BsCameraVideo /> : null}
          </div>
        </div>
        <div className={type === "event" ? "none" :"container_profile"}>
          <img src={client.avatar} alt="avatar"/>
          <a href="" className="link">View Client Profile</a>
        </div>
      </div>
      )}
    </>
  );
}

export default Event;
