import React from "react";
import Head from "next/head";
import Footer from "./../sources/component/Footer.component";
import MessageBox from "./../sources/component/MessageBox.component";
import PopUp from "./../sources/component/PopUp.component";
import Account from "./../sources/account/Account.component";
import { connect } from "react-redux";
import { selcetAccountBox } from "../Redux/UI/ui.reselect";
import { accountBoxModify } from "../Redux/UI/ui.action";
import { selectCredentials } from "../Redux/Search/search.reselect";
import GetFlightList from "./../sources/flight_List/GetFlightList.page";
import FlightReserve from "./../sources/flight_reserve/FlightReseve.page";
import FlightReciept from "./../sources/flight_receipt/FlightReciept.page";
import TrackOrder from "./../sources/report/TrackOrder.page";
import { withRouter } from "next/router";
import { selectAirports } from "../Redux/Airports/airport.reselect";
import NavHandler from "../Components/share/NavHandler";
import FlightBase from "../sources/manager/flights/FlightBase";

class Flights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 1024,
        };

        
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    mainRouter(pathName) {
        pathName = decodeURI(pathName);
        if (pathName.indexOf("info") > 0) {
            return <FlightReserve />;
        } else if (pathName.indexOf("receipt") > 0) {
            return <FlightReciept />;
        } else if (pathName.indexOf("order") > 0) {
            return <TrackOrder />;
        } else {
            if(pathName.indexOf('to')>0){

                return <GetFlightList />;
            }else{
                return <FlightBase/>
            }
        }
    }

    setTitleMeta(pathName) {
        //  var src=this.state.sourceName;
        //  var dest=this.state.destinationName;

        pathName = decodeURI(pathName);
        if (pathName.indexOf("info") > 0) {
            return "بلیطجا"; //<FlightReserve />;
        } else if (pathName.indexOf("receipt") > 0) {
            return "بلیطجا"; //<FlightReciept />;
        } else {
            // srcEn = decodeURI(pathName.split("/")[2]).split("-")[0];
            // destEn = decodeURI(pathName.split("/")[2]).split("-")[1];
            // 
            // 

            return (
                " خرید اینترنتی بلیط هواپیما " +
                this.props.credentials.sourceName +
                "-" +
                this.props.credentials.destinationName +
                " با ارزانترین قیمت|20درصد تخفیف بلیطجا  " +
                "/" +
                "خرید اینترنتی بلیط هواپیما " +
                this.props.credentials.sourceName +
                " به " +
                this.props.credentials.destinationName +
                " به بهترین نرخ با امکان رزرو آنلاین و اینترنتی  به همراه ارزانترین قیمت  بلیط هواپیما و هتل در سایت بلیط جا امکان پذیر است . 02184279999 " +
                "/" +
                " بلیط ارزان هواپیما " +
                this.props.credentials.sourceName +
                " به " +
                this.props.credentials.destinationName +
                "|خرید اینترنتی بلیط هواپیما " +
                this.props.credentials.sourceName +
                " به " +
                this.props.credentials.destinationName +
                ""
            ); //<GetFlightList />;
        }
    }
    componentDidMount() {
        localStorage.setItem("url", JSON.stringify(this.props.router.asPath))
    this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }
    render() {

        return (
            <div className="bodyVar">
                <NavHandler type={this.props.router.asPath.split('/')[2]} />
                <div className={this.state.width >= 826 ? "mt-110":``} style={{marginTop:this.state.width <= 826 &&'60px'}}>
                    {
                        this.mainRouter(this.props.router.asPath)
                    }
                    <MessageBox />
                    <Footer />
                    <Head>
                        <title>
                            {
                                // {`بلیطجا ${decodeURI(this.props.router.asPath).replace('-',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ')}`}
                                this.setTitleMeta(this.props.router.asPath.split("#")[0]).split(
                                    "/"
                                )[0]
                            }{" "}
                        </title>
                        <meta
                            name="title"
                            property="og:title"
                            content={
                                this.setTitleMeta(this.props.router.asPath.split("#")[0]).split(
                                    "/"
                                )[0]
                            }
                        />

                        <meta
                            name="description"
                            property="og:description"
                            content={
                                this.setTitleMeta(this.props.router.asPath.split("#")[0]).split(
                                    "/"
                                )[1]
                            }
                        />
                        <meta
                            name="keywords"
                            property="og:keywords"
                            content={
                                this.setTitleMeta(this.props.router.asPath.split("#")[0]).split(
                                    "/"
                                )[2]
                            }
                        />
                    </Head>
                </div>
                <PopUp
                    opened={this.props.accountBox.state}
                    closePopUp={() => {
                        this.props.accountBoxModify({
                            state: false,
                        });
                    }}
                >
                    <Account />
                </PopUp>
            </div>
        );
    }
}
const mapStatesToProps = (state) => ({
    accountBox: selcetAccountBox(state),
    airports: selectAirports(state),
    credentials: selectCredentials(state),
});
const mapDispatchesToProps = (dispatch) => ({
    accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
export default withRouter(
    connect(mapStatesToProps, mapDispatchesToProps)(Flights)
);
