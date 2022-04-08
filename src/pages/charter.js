import { useRouter } from "next/router";
import Charetrflight from "../sources/charterflight/charterflight";
import Footer from "../sources/component/Footer.component";
import NavBarComponent from "../sources/component/NavBar.component";

const FlightCharterlist = () => {
  const Router = useRouter();
  function mainRouter(pathName) {
    var path = decodeURI(pathName);
    switch (path) {
      case "/charter":
        return (
          <div >
            <Charetrflight />
          </div>
        );

      default:
        return "hello";
    }
  }
  return (
    <div className="bodyVar">
      {mainRouter(Router.asPath)}
      <Footer />
    </div>
  );
};

export default FlightCharterlist;
