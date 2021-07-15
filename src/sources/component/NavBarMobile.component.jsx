import React from 'react'
//import logo from '../../../Images/logo512.png'
//import footerLogo from '../../../Images/bilitja-light-logo.png'
import styles from  '../../../styles/NavBarMobile.module.scss'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SlideIn from './SlideIn.component'


import { connect } from 'react-redux'
import { accountBoxModify } from '../../Redux/UI/ui.action'
class NavBarMobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuOpen: false,
            slide: false
        }
    }
    render() {
        return (
            /*<div className={styles['error-mobile']}> hghgshghgsd</div>*/
                  <nav  className={styles['nav-mobile']}>
                    <div className={styles['nav-text-detail-mobile']}>
                    <div className="pull-right">
                        <i className="kilo-font icon-login font-size-14 color-black"></i>
                        <a href="" className="font-size-13 color-black" onClick={(e) => {
                            e.preventDefault()
                            this.props.accountBoxModify({
                                state: true,
                                type: 'login'
                            })
                        }}>
                            <span className="font-bold-iransanse">ورود </span>
                            /
                        </a>

                        <a href="" className="color-black font-size-13" onClick={(e) => {
                            e.preventDefault()
                            this.props.accountBoxModify({
                                state: true,
                                type: 'login'
                            })
                        }}>
                            <i className="kilo-font icon-register font-size-14"></i>
                            &nbsp;
                            <span className="font-bold-iransanse">ثبت نام</span>
                        </a>

                        <a href="/ویلا/intro" className="font-size-10 btn-outlined">میزبان شوید</a>

                    </div>
                    <div className="pull-left">
                        <a href="#" className="color-black font-bold-iransanse">
                            <span>مشاوره تلفنی : </span>
                            <i className="kilo-font icon-phone font-size-14"></i>
                            <span className="font-size-13"> &nbsp;۰۲۱-۵۷۸۷۴</span>
                        </a>
                    </div>
                </div>
                <div className={styles['nav-logo-container-mobile']}>
                    <div className="pull-right">
                        <FontAwesomeIcon icon={faBars} onClick={() => {
                            this.setState({
                                slide: true
                            })
                        }} />
                        <h1 className="font-bold-iransanse"> خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه </h1>
                    </div>
                    <img src='../../../Images/logo512.png' className="pull-left" />
                </div>

                <SlideIn slide={this.state.slide} close={() => {
                    this.setState({
                        slide: false
                    })
                }}>
                    <div className={styles['nav-items-container-mobile']}>
                        <div className={styles['logo-menu-mobile']}>
                            <a href="/"><img src='../../../Images/bilitja-light-logo.png'/></a>
                            <p className="no-margin color-white">ارزان ترین بلیط های هواپیما</p>
                        </div>
                        <ul>
                            <li>
                                <div>
                                    <a href="/">
                                        <i className="kilo-font font-size-24 icon-plane-departure pull-right rotate-y-180"></i>
                                        <span className="pull-right font-size-14 color-black">بلیط هواپیما</span>
                                    </a>
                                    <div className="clear"></div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <a href="/ویلا">
                                        <i className="kilo-font font-size-24 icon-villa pull-right rotate-y-180"></i>
                                        <span className="pull-right font-size-14 color-black">اقامتگاه</span>
                                    </a>
                                    <div className="clear"></div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <a href="#">
                                        <i className="kilo-font font-size-24 icon-blog pull-right rotate-y-180"></i>
                                        <span className="pull-right font-size-14 color-black">بلاگ</span>
                                    </a>
                                    <div className="clear"></div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <a href="/بلیط-هواپیما/order">
                                        <i className="kilo-font font-size-24 icon-refrence pull-right rotate-y-180"></i>
                                        <span className="pull-right font-size-14 color-black">پیگیری خرید</span>
                                    </a>
                                    <div className="clear"></div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <a href="#">
                                        <i className="kilo-font font-size-24 icon-refrence pull-right rotate-y-180"></i>
                                        <span className="pull-right font-size-14 color-black">درباره ما</span>
                                    </a>
                                    <div className="clear"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </SlideIn>
            </nav> 
        )
    }
}
const mapDispatchesToProps = (dispatch) => ({
    accountBoxModify: value => dispatch(accountBoxModify(value))
})
export default connect(null, mapDispatchesToProps)(NavBarMobile)