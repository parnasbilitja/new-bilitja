import React, { useEffect, useState } from 'react';
import Tour from '../sources/manager/tours/Tours'
import axios from 'axios';
import { useAtom } from 'jotai';
import {tourSlug} from '../jotai/jotai';

const tour = () => {
    const [data,setData] = useState(null)
    const [slug,setSlug] = useAtom(tourSlug)
    let s = "تور-کوش-آداسی-ویژه-2-و-3-و-5-شهریور"
    // let s = localStorage.getItem("slug")
    const getData = async() => {
        const val = await axios.get(`https://api.hamnavaz.com/api/v1/tour/getTour/${slug ? slug :JSON.parse(localStorage.getItem("slug"))}`)
        setData(val.data.data)
    }
    useEffect(() =>{
        getData();
        console.log(data);
    },[data])
    return (
        <div>
            <div className='row justify-content-center'>
            {/* {data && data.map((item)=>( */}
                    <div className="m-2 card col-3" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">{data && data.title}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">تعداد روز:{data && data.dayNum}</li>
                            <li className="list-group-item">تعداد شب:{data && data.nightNum}</li>
                            <li className="list-group-item">قیمت:{data && data.minPrice}</li>
                        </ul>
                        <ul className="list-group list-group-flush">
                            {data &&
                            <li className="list-group-item">ایرلاین رفت :
                             {data.transfers[0].transfer}
                             </li>
                             }
                            {data &&
                            <li className="list-group-item">ایرلاین برگشت :
                             {data.transfers[1].transfer}
                             </li>
                             }
                            <li className="list-group-item">{data && data.transfers[0].dateTime}</li>
                            <li className="list-group-item">{data && data.transfers[1].dateTime}</li>
                            <li className="list-group-item">{data && data.stCity.name}</li>
                            <li className="list-group-item">{data && data.endCity.name}</li>
                        </ul>
                    </div>
            {/* // ))} */}
            </div>
        </div>
    );
};

export default tour;