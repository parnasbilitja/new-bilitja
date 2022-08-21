import React from 'react'
import styles from '../../../styles/villaList.module.scss'
import stylesflight from '../../../styles/Flight.module.scss'
import villaSearchBox from '../villa/villaSearchBox.component'

import { faFilter, faSearch, faMap, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SlideIn from '../component/SlideIn.component'
import villaFilters from './villaFilterList.component'
import PopUp from '../component/PopUp.component'

import villaListDesktop from './villaListDesktop.component'
import villaListMobile from './villaListMobile.component'

import { selectCredentials } from '../../Redux/Searchvilla/search_villa.reselect'
import { connect } from 'react-redux'
import globals from '../Global'
class villaList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slide: false,
            open: false,
            villaList: []
        }
    }

    componentDidMount() {
        const { city, dateStart, dateEnd } = this.props.selectCredentials
        fetch(`${globals.baseUrl}bj/site/search/${city}/${String(dateStart).replace("/", "").replace("/", "")}/${String(dateEnd).replace("/", "").replace("/", "")}`)
            .then(res => res.json()).then(data => {
                this.setState({
                    villaList: data.Eghamat
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
            <div className={`container-fluid ${stylesflight['flight-container']}`}>
                <div className={`row text-right  ${stylesflight['hidden-xs-flight']}`}>
                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-11 col-sm-11">
                        <villaSearchBox />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-0 col-0"></div>
                    <div className="col-lg-10 col-md-11 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-8 col-12 padding-10px">
                                <villaListDesktop villaList={this.state.villaList} />
                                <villaListMobile villaList={this.state.villaList} />
                            </div>
                            <div className={`col-lg-3 col-md-4 col-sm-4 ${stylesflight['hidden-xs-flight']} padding-5px`}>
                                <villaFilters />
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
                        <villaSearchBox />
                    </div>
                </PopUp>


                <SlideIn slide={this.state.slide} close={() => {
                    this.setState({
                        slide: false
                    })
                }}>
                    <villaFilters />
                </SlideIn>

                <div className={styles['visible-xs-villa-footer']}>
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
const mapStatesToProps = (state) => ({
    selectCredentials: selectCredentials(state)
})
export default connect(mapStatesToProps)(villaList)