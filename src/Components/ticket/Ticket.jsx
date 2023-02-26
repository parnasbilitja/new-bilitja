import React from 'react';
import Footer from '../../sources/component/Footer.component';
import HeadSeo from '../../sources/component/HeadSeo';
import MessageBox from '../../sources/component/MessageBox.component';
import HomePage from '../../sources/Home.page';

const Ticket = (props) => {
    return (
        <div className={"mt-100"}>
          <HomePage />
          <MessageBox />
          <Footer />
          <HeadSeo props={props} pathName={props.router.asPath} />
        </div>
    );
};

export default Ticket;