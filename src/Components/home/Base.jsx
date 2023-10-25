import Head from 'next/head';
import React from 'react';
import Footer from '../../sources/component/Footer.component';
import HeadSeo from '../../sources/component/HeadSeo';
import MessageBox from '../../sources/component/MessageBox.component';
import Scrolltoprefresh from '../../sources/component/Scrolltoprefresh';
import TicketDetails from '../../sources/component/TicketDetails';
import Home from '../../sources/Home.page';
import dynamic from 'next/dynamic';
const CitiesSuggest = dynamic(()=> import ('../../sources/tour/CitiesSuggest'));
const HotelsSuggest = dynamic(()=> import ('../../sources/tour/HotelsSuggest'));
const List = dynamic(()=> import ( '../../sources/tour/List'));
const Posts = dynamic(()=> import ( '../../sources/tour/Posts'));
import NavHandler from '../share/NavHandler';

import { connect } from "react-redux";
import { selcetAccountBox } from "../../Redux/UI/ui.reselect";
import { accountBoxModify } from "../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import HomeDet from "../../sources/newTour/HomeDet";

const Base = (props) => {
    return (
        <div className={"mt-90"}>
            {/*<NavHandler />*/}
            <Scrolltoprefresh/>
            <Head>
                <title>همنواز | خرید بلیط هواپیما و رزرو اقامتگاه</title>
            </Head>
            {/*<Home type={'index'} />*/}
            {/*<div className="col-md-10 m-auto px-3 padd2">*/}
            {/*  <List />*/}
            {/*  <HotelsSuggest />*/}
            {/*  <CitiesSuggest />*/}
            {/*  <Posts/>*/}
            {/*</div>*/}
            {/*  <div className='padd2'>*/}

            {/*<TicketDetails/>*/}
            {/*<MessageBox />*/}
            {/*  </div>*/}
            {/*<Footer />*/}

            <HomeDet/>
            <HeadSeo props={props} pathName={props.router.asPath} />
        </div>
    );
};

const mapStatesToProps = (state) => ({
    accountBox: selcetAccountBox(state),
});
const mapDispatchesToProps = (dispatch) => ({
    accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});

export default withRouter(connect(mapStatesToProps, mapDispatchesToProps)(Base));