import Head from 'next/head';
import React from 'react';
import Footer from '../../sources/component/Footer.component';
import HeadSeo from '../../sources/component/HeadSeo';
import MessageBox from '../../sources/component/MessageBox.component';
import Scrolltoprefresh from '../../sources/component/Scrolltoprefresh';
import TicketDetails from '../../sources/component/TicketDetails';
import Home from '../../sources/Home.page';
import CitiesSuggest from '../../sources/tour/CitiesSuggest';
import HotelsSuggest from '../../sources/tour/HotelsSuggest';
import List from '../../sources/tour/List';
import Posts from '../../sources/tour/Posts';
import NavHandler from '../share/NavHandler';

const Base = (props) => {
    return (
        <div className={"mt-90"}>
          <NavHandler />
        <Scrolltoprefresh/>
        <Head>
                <title>بلیطجا | خرید بلیط هواپیما و رزرو اقامتگاه</title>
        </Head>
          <Home type={'index'} />
          <div className="col-md-10 m-auto">
            <List  />
            <HotelsSuggest />
            <CitiesSuggest />
              <Posts/>
          </div>
          <TicketDetails/>
          <MessageBox />
          <Footer />
          <HeadSeo props={props} pathName={props.router.asPath} />
        </div>
    );
};

export default Base;