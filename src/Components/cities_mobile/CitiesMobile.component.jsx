import React from 'react'
import styles from "../../../styles/AirportsMobile.module.scss"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { selectCities } from '../../Redux/City/city.reselect'
import { addCredentials } from '../../Redux/SearchAccommodation/search_accommodation.action'
import { connect } from 'react-redux'

class CitiesMobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
    }

    handleChange = (event) => {
        const { value } = event.target
        this.props.handleChange(value)
    }

    render() {
        return (
            <div className={styles['mobile-suggestions']}>
                <div className={styles['mobile-suggestion-heading']}>
                    <span>{this.props.title}</span>
                    <span className="pull-left exit-form" onClick={() => {
                        this.props.closePopUp(false)
                    }}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>

                </div>
                <input name="searchTerm" autoFocus={false} value={this.props.searchTerm} autoComplete={false} className={`${styles['input-search-private']} input-search `} onChange={this.handleChange} placeholder="مبدا خود را وارد کنید" />
                <div className={styles['mobile-airport-list']}>
                    {
                        //fill airports
                        this.props.cities ?
                            this.props.cities.filter(oneCity=>oneCity.CityName.includes(this.props.searchTerm)).map(oneCity => (
                                <div key={oneCity.airportKey} onClick={() => {
                                    this.props.addCredentials({
                                        cityName: oneCity.CityName,
                                        city: oneCity.CityId
                                    })

                                    this.props.closePopUp(false)
                                }}>
                                    <span>{oneCity.CityName}</span>
                                    <span className="pull-left">{oneCity.AirportCode}</span>
                                </div>
                            ))

                            : null
                    }
                </div>
            </div>
        )
    }
}

const mapStatesToProps = (state) => ({
    cities: selectCities(state),
})

const mapDispatchesToProps = (dispatch) => ({
    addCredentials: value => dispatch(addCredentials(value))
})
export default connect(mapStatesToProps, mapDispatchesToProps)(CitiesMobile)