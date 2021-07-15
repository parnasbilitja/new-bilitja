import React from 'react'
import Image from 'next/image'
//import logo from '../../../Images/logo512.png'
import styles from '../../../styles/NavBar.module.scss'

//import '../../../public/kilofont.svg'

import { connect } from 'react-redux'
import { accountBoxModify } from '../../Redux/UI/ui.action'


class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <nav className={styles.navVar}>
                <div className={styles['nav-text-detail']}>
                    <div>
                        <a href="/ویلا/intro" className={`font-size-10 btn-outlined ${styles['btn-nav-hosting']}`}>میزبان شوید</a>
                    </div>
                    <div className="font-size-12">
                        <div className={styles['nav-detail-first-line']}>
                            <div>
                                <a href="" onClick={(e) => {
                                    e.preventDefault()
                                    this.props.accountBoxModify({
                                        state: true,
                                        type: 'login'
                                    })
                                }}>
                                    <i className="kilo-font icon-login"></i>
                                    <span >ورود کاربر</span>
                                </a>
                            </div>
                            <div className="border-right">
                                <a href="" onClick={(e) => {
                                    e.preventDefault()
                                    this.props.accountBoxModify({
                                        state: true,
                                        type: 'login'
                                    })
                                }}>
                                    <i className="kilo-font icon-register"></i>
                                    <span>ثبت نام</span>
                                </a>
                            </div>
                        </div>
                        <div className={styles['nav-detail-second-line']}>
                            <a href="#">
                                <span>مشاوره تلفنی : </span>
                                <i className="kilo-font icon-phone"></i>
                                <span>۰۲۱۵۷۸۷۴</span>
                            </a>
                        </div>
                    </div>

                </div>
                <div className={styles['nav-items-container']}>
                    <ul className={styles['navbar-items']}>
                        <li>
                            <a href="/">
                                <i className={`kilo-font icon-plane-departure  ${styles['nav-icon']} rotate-y-180`}></i>
                                بلیط هواپیما
                            </a>
                        </li>
                        <li>
                            <a href="/ویلا">
                                <i className={`kilo-font icon-villa ${styles['nav-icon']} `}></i>
                                اقامتگاه
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className={`kilo-font icon-blog ${styles['nav-icon']} `}></i>
                                بلاگ
                            </a>
                        </li>
                        <li>
                            <a href="/بلیط-هواپیما/order">
                                <i className={`kilo-font icon-refrence ${styles['nav-icon']} `}></i>
                                پیگیری خرید
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles['nav-logo-container']}>
                    <div>
                        <a href="/">
                            <img className={styles['logo']} src="../../../Images/logo512.png" />
                        </a>
                        <p className="font-size-10">خرید بلیط هواپیما و رزرو اقامتگاه</p>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapDispatchesToProps = (dispatch) => ({
    accountBoxModify: value => dispatch(accountBoxModify(value))
})

export default connect(null, mapDispatchesToProps)(NavBar);