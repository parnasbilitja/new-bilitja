import React from 'react'
import '../../../styles/AccommodationList.module.scss'

import AccommodationSearchBox from '../../Components/accommodation_search_box/AccommodationSearchBox.component'

import {faFilter, faSearch, faMap,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SlideIn from '../../Components/slide_in/SlideIn.component'
import AccommodationFilterList from '../../Components/accommodation_filter_list/AccommodationFilterList.component'
import PopUp from '../../Components/pop_up/PopUp.component'

import AccommodationListDesktop from '../../Components/accommodation_list_desktop/AccommodationListDesktop.component'
import AccommodationListMobile from '../../Components/accommodation_list_mobile/AccommodationListMobile.component'

import {selectCredentials} from '../../Redux/SearchAccommodation/search_accommodation.reselect'
import { connect } from 'react-redux'
import globals from '../../Globals/Global'
class AccommodationList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slide: false,
            open: false,
            accommodationList:[]
        }
    }

    componentDidMount(){
        const {city, dateStart ,dateEnd} = this.props.selectCredentials
        fetch(`${globals.baseUrl}bj/site/search/${city}/${String(dateStart).replace("/","").replace("/","")}/${String(dateEnd).replace("/","").replace("/","")}`)
        .then(res=>res.json()).then(data=>{
            this.setState({
                accommodationList:data.Eghamat
            })
        })
    }

    managePopUpSearch = (value) => {
        this.setState({
            open: value
        })
    }
    render() {
        return (
            <div className="container-fluid flight-container">
                <div className="row text-right hidden-xs-flight">
                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-11 col-sm-11">
                        <AccommodationSearchBox />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-0 col-0"></div>
                    <div className="col-lg-10 col-md-11 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-8 col-12 padding-10px">
                                <AccommodationListDesktop accommodationList={this.state.accommodationList}/>
                                <AccommodationListMobile accommodationList={this.state.accommodationList}/>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-4 hidden-xs-flight padding-5px">
                                <AccommodationFilterList />
                            </div>
                        </div>
                    </div>

                </div>

                <PopUp opened={this.state.open} closePopUp={this.managePopUpSearch}>
                    <div className="popup-content-container">
                        <div className="popup-heading">
                            <span>جستجو مجدد</span>
                            <span className="pull-left exit-form" onClick={() => {
                                this.managePopUpSearch(false)
                            }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>

                        </div>
                        <AccommodationSearchBox />
                    </div>
                </PopUp>


                <SlideIn slide={this.state.slide} close={() => {
                    this.setState({
                        slide: false
                    })
                }}>
                    <AccommodationFilterList />
                </SlideIn>

                <div className="visible-xs-accommodation-footer">
                    <div onClick={() => {
                        this.setState({
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
                        this.managePopUpSearch(true)
                    }}>
                        <FontAwesomeIcon icon={faSearch} />
                        <p>جستجو</p>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatesToProps=(state)=>({
    selectCredentials:selectCredentials(state)
})
export default connect(mapStatesToProps)(AccommodationList)