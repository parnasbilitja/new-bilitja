import React from 'react'
import { selectCities } from '../../Redux/City/city.reselect'
import { addCredentials } from '../../Redux/SearchAccommodation/search_accommodation.action'
import { connect } from 'react-redux'

const Cities = (props) => {
    return (
        <div className="suggestion-box">
            {
                //fill airport
                props.cities ?
                    props.cities.filter(oneCity=>oneCity.CityName.includes(props.searchTerm)).map(oneCity => (
                        <div key={oneCity.CityId} onClick={() => {

                            props.addCredentials({
                                cityName: oneCity.CityName,
                                city: oneCity.CityId
                            })

                            props.closeSuggest(false)
                        }}>
                            <span className="font-size-14">{oneCity.CityName}</span>
                            <span className="pull-left font-size-13 color-textpill">{oneCity.AirportCode}</span>
                        </div>
                    ))

                    : null
            }
        </div>
    )
}

const mapStatesToProps = (state) => ({
    cities: selectCities(state),
})

const mapDispatchesToProps = (dispatch) => ({
    addCredentials: value => dispatch(addCredentials(value))
})

export default connect(mapStatesToProps, mapDispatchesToProps)(Cities)