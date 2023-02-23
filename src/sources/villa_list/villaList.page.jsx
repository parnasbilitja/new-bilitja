import React from 'react'
import styles from '../../../styles/villaList.module.scss'
import stylesflight from '../../../styles/Flight.module.scss'

import { faFilter, faSearch, faMap, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SlideIn from '../component/SlideIn.component'
import PopUp from '../component/PopUp.component'

import { selectCredentials } from '../../Redux/Searchvilla/search_villa.reselect'
import { connect } from 'react-redux'
import PageTabls from '../component/PageTabs.component'
import { useState } from 'react'
import { useEffect } from 'react'
const villaList = (props) => {
        const [state, setState] = useState({
            slide: false,
            open: false,
            villaList: []
        })
        const [type, setType] = useState(4) 
    // useEffect(() => {
    //     const { city, dateStart, dateEnd } = props.selectCredentials
    //     fetch(`${globals.baseUrl}bj/site/search/${city}/${String(dateStart).replace("/", "").replace("/", "")}/${String(dateEnd).replace("/", "").replace("/", "")}`)
    //         .then(res => res.json()).then(data => {
    //             setState({
    //                 villaList: data.Eghamat
    //             })
    //         })
    // },[])

    const managePopUpSearch = (value) => {
        setState({...state,
            open: value
        })
    }
        return (
            <div className={`container-fluid ${stylesflight['flight-container']}`}>
                <div className={`row text-right  ${stylesflight['hidden-xs-flight']}`}>
                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-11 col-sm-11">
                    <PageTabls type={type} setType={setType} />
                        {/* <villaSearchBox /> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-0 col-0"></div>
                    <div className="col-lg-10 col-md-11 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-8 col-12 padding-10px">
                                <villaListDesktop villaList={state.villaList} />
                                <villaListMobile villaList={state.villaList} />
                            </div>
                            <div className={`col-lg-3 col-md-4 col-sm-4 ${stylesflight['hidden-xs-flight']} padding-5px`}>
                                <villaFilters />
                            </div>
                        </div>
                    </div>

                </div>

                <PopUp opened={state.open} closePopUp={managePopUpSearch}>
                    <div className="popup-content-container">
                        <div className="popup-heading d-flex align-items-center justify-content-between">
                            <span>جستجو مجدد</span>
                            <span className="exit-form" onClick={() => {
                                managePopUpSearch(false)
                            }}>
                                <CloseOutlined style={{ color: "red" }} />
                            </span>
                        </div>
                        <villaSearchBox />
                    </div>
                </PopUp>


                <SlideIn slide={state.slide} close={() => {
                    setState({
                        slide: false
                    })
                }}>
                    <villaFilters />
                </SlideIn>

                <div className={styles['visible-xs-villa-footer']}>
                    <div onClick={() => {
                        setState({
                            slide: true
                        })
                    }}>
                        <FontAwesomeIcon icon={faFilter} />
                        <p>فیلتر</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faMap} />
                        <p>موقعیت</p>
                    </div>
                    <div onClick={() => {
                        managePopUpSearch(true)
                    }}>
                        <FontAwesomeIcon icon={faSearch} />
                        <p>جستجو</p>
                    </div>
                </div>
            </div>
        )
    
}
const mapStatesToProps = (state) => ({
    selectCredentials: selectCredentials(state)
})
export default connect(mapStatesToProps)(villaList)