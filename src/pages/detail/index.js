import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams(); 
    const getData = async (id) => {
        await fetch(`https://aws-seven-self.vercel.app/api/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                const data = await response.json();
                console.log("data", data);
            }
            )
            .catch(error => console.error('Lỗi:', error));
    }
    useEffect(() => {
        getData(id);
    }, [id])

    return ( <div>Detail</div> );
}

export default Detail;