import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loader } from '../../Utils/Loader';
import Posts from './Posts';
import Questions from './Questions';

const TourData = ({currentCity, search, setSearch}) => {
    const [ data, setData ] = useState([])
    const [loading, setLoading] = useState(true)
    
    const getData = async () => {
        setLoading(true)
        await axios.get(`https://api.hamnavaz.com/api/v1/city/getCity/${currentCity}`)
        .then(res => {setData(res.data.data),setLoading(false)})
    }
    useEffect(() => {
        getData()
    },[])
    useEffect(() => {
        if (search) {
            getData()
        }
        setSearch(false)
    },[currentCity,search])
    return (
        <>
        {loading?
            <Loader/>:    
            <>
            <div className="about-city">
                    <div className="title-s2" id="tours">
                        <div className="text">
                            <img src="https://hamnavaz.com/img/Notification%202.svg" width="35" alt={`"تور ${data.name}`}/>
                            <div> تور ارزان {data.name}</div>
                        </div>
                    </div>
                    <div class="parent-gallery">
                        <div class="right-gallery">
                            {data.images?.map((item,index)=>(
                                <>
                                {index >= 1 && index < 5 &&
                                    <img class="top-right" src={item} alt=""/>
                                }
                                </>
                            ))}
                        </div>
                        <div class="left-gallery" style={{backgroundImage: `url(${data.images && data.images[0] && data.images[0]})`}}>
                        </div>
                    </div>
                    <div className="p-collapse-info-city">
                        <div className="bg-text" dangerouslySetInnerHTML={{__html:data.description}} />
                    </div>

            </div>
            <div id='blog'>
                <Posts/>
            </div>
            <Questions data={data.faq} />
        </>
        }
        </>
            
    );
};

export default TourData;