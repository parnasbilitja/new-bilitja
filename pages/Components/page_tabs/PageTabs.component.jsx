import React from 'react'
import '../../../styles/PageTabs.module.scss'

const PageTabls = (props) => {
    return (
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
                <div className="tab-container">
                    <div className={`home-tab ${props.tabActice == 1 ? "home-tab-active" : null}`} onClick={() => {
                        props.history.push("/")
                    }}>
                        <div className="pull-right">
                            <i className="kilo-font font-size-24 icon-plane-departure"></i>
                        </div>
                        <div className="pull-right">
                            <span className="font-size-14"> بلیط هواپیما </span>
                        </div>
                    </div>
                    <div className={`home-tab ${props.tabActice == 2 ? "home-tab-active" : null}`} onClick={() => {
                        props.history.push("/ویلا")
                    }}>
                        <div className="pull-right icon-container">
                            <i className="kilo-font font-size-20 icon-villa"></i>
                        </div>
                        <div className="pull-right">
                            <span className="font-size-14"> اقامتگاه </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageTabls