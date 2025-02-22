import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";
import {convertToLongDate, convertDate} from '../../common/index';
function Detail() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const getData = async (id) => {
        await fetch(`https://aws-seven-self.vercel.app/api/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                const res = await response.json();
                setData(res)
            }
            )
            .catch(error => console.error('Lỗi:', error));
    }
    useEffect(() => {
        getData(id);
    }, [id])
    return (<div className="container_detail">
        <div className="container_img">
            <img src={data.image} alt="background" />
        </div>
        <div className="container_text">
            <div className="left">
                <div className="date">{convertToLongDate(data.from)}</div>
                <div className="title">{data.name}</div>
                <div className="description">{data.description}</div>
                <div className="date">{convertDate(data.from)}</div>
            </div>
            <div className="right">
                <div className="container_price">
                    <div className="price">${data.ticketPrice}</div>
                    <button className="button" onClick={() => {}}>Join waitlist</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Detail;