import dayjs from "dayjs";
import './Event.css';
import { BsCameraVideo } from "react-icons/bs";

function Event(data) {
  return (
    <div className="event">
       <div className="camera_white">
        <BsCameraVideo />
       </div>
       {/* <div className="camera_blue">
        <BsCameraVideo />
       </div> */}
    </div>
  );
}

export default Event;
