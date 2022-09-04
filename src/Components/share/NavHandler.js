import React, { Component } from 'react';
import NavBar from "../../sources/component/NavBar.component";
import NavBarMobile from "../../sources/component/NavBarMobile.component"

class NavHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width: 1024,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
    componentDidMount() {
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
            <>
                {this.state.width <= 826 ? <NavBarMobile /> : null}
                {this.state.width >= 826 ? <NavBar /> : null}
            </>
        );
    }
}

export default NavHandler;