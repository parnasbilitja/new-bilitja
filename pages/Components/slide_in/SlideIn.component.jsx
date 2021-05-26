import '../../../styles/SlideIn.module.scss'
const SlideIn = function (props) {
    return (
        <div>
            <div className={`slide-in-form ${props.slide ? "slidein" : "slideout"}`}>
                {props.children}
            </div>
            <div className="slide-in-screen-saver" style={props.slide ? { display: "block" } : { display: "none" }} onClick={() => {
                    props.close()
            }}></div>
        </div>
    )
}

export default SlideIn