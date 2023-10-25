import React, {useEffect, useRef, useState} from "react";
import {selectAirports} from "../../../../Redux/Airports/airport.reselect";
import {connect} from "react-redux";
import {selectCredentials} from "../../../../Redux/Search/search.reselect";
import {addCredentials} from "../../../../Redux/Search/search.action";
import {setDestLoc, setOrgLoc} from "../../../../Redux/newTours/Action";
import {Loader} from "../../../../Utils/Loader";
import NewLoader from "./NewLoader";
import styles from '../../../../../styles/newTour/components/subComponent/Cities.module.scss'

const Cities = (props) => {
    const [search, setsearch] = useState('')
    const [widthMobi, setWidthMobi] = useState(
        typeof window !== "undefined" && getWindowSize()
    );
    const inputRef = useRef();

    useEffect(() => {
        if(widthMobi<868){
            inputRef.current.focus();
        }
    }, []);

    function getWindowSize() {
        const {innerWidth} = window;
        return innerWidth;
    }

    useEffect(() => {
        function handleWindowResize() {
            setWidthMobi(getWindowSize());
        }

        window.addEventListener("resize", handleWindowResize);
    }, []);
    const [Cities, setCities] = useState([])


    useEffect(() => {
        setCities(props.cities)
    }, [props.cities])

    useEffect(() => {
        if (props.searchInputval) {
            let findCities = props.cities?.filter(city => city?.name.includes(props.searchInputval))
            if (findCities) {
                setCities(findCities)
            } else {
                setCities(props.cities)
            }

        } else {
            setCities(props.cities)
        }
    }, [props.searchInputval])

    useEffect(() => {
        if (search) {
            let findCities = props.cities?.filter(city => city?.name.includes(search))
            if (findCities) {
                setCities(findCities)
            } else {
                setCities(props.cities)
            }

        } else {
            setCities(props.cities)
        }
    }, [search])


    return (
        <>
            {widthMobi > 868 ? <div
                    style={{
                        height: "auto",
                        maxHeight: "300px",
                        overflowY: "auto",
                        // position: "absolute",
                        background: "#fff",
                        borderRadius: 8,
                        width: "100%",
                        marginTop: "12px",
                        padding: "5px 12px",
                        cursor: "pointer",
                        position: "absolute",
                        zIndex: "1000",
                    }}
                    className="suggestion-box"
                >
                    {/* //fill airport */}
                    {Cities.length === 0 ? (
                        <NewLoader/>
                    ) : (
                        Cities?.map((city) => (
                            <div
                                onClick={() => {
                                    props.setCities({name: '', code: ''})
                                    props.setCities({name: city.name, code: city.code});
                                    // props.setSearchInput(city.name)
                                    props.closeSuggest(false);
                                    props.setFlightDate({
                                        persianDate: "",
                                        miladiDate: "",
                                    });
                                    props.setNights([]);
                                }}
                                style={{padding: "5px"}}
                            >
                                <span className="font-size-14">{city.name}</span>
                                <span className="pull-left font-size-13 color-textpill">
                                          {city.code}
                                </span>
                            </div>
                        ))
                    )}

                </div> :
                <div className={styles['citymodalcontainer']}>
                    <div className={styles['cities-container']}>
                        <div className={styles['cities']}>
                            <div className={styles['title']}>
                                <p>{props.citystat}</p>
                                <div className={styles['closebtn']} onClick={() => props.closemange()}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                         className="svg-inline--fa fa-times fa-w-11 " role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" fill='#e20000'>
                                        <path
                                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className={styles['inputcon']}>
                                <input type="text" value={search} onChange={(e) => {
                                    setsearch(e.target.value)
                                }} placeholder={` ${props.citystat} خود را وارد کنید `}/>
                                <button ref={inputRef}></button>
                            </div>

                            <div className={styles['citiesItem']}>
                                {Cities.length === 0 ? (

                                    <NewLoader/>
                                ) : (
                                    Cities?.map((city) => (
                                        <div
                                            onClick={() => {
                                                props.setCities({name: '', code: ''})
                                                props.setCities({name: city.name, code: city.code});
                                                props.closeSuggest(false);
                                                props.setFlightDate({
                                                    persianDate: "",
                                                    miladiDate: "",
                                                });
                                                props.setNights([]);
                                            }}
                                            style={{marginBottom:'10px'}}

                                        >
                                            <span className="font-size-14">{city.name}</span>
                                            <span className="pull-left font-size-14 font-bolder" style={{}}>
                                                      {city.code}
                                                    </span>
                                        </div>
                                    ))
                                )}

                            </div>
                        </div>
                    </div>
                </div>

            }     </>
    );
};
const mapStatesToProps = (state) => ({
    airports: selectAirports(state),
    credentials: selectCredentials(state),
    dest: state.destandoriginCitiesTour,
});

export default connect(mapStatesToProps, null)(Cities);
