import React from "react";
import "../../../styles/ImageSlider.module.scss";

//import img from '../../../Images/hotel_view.jpg'
//import img2 from '../../../Images/hotel_view2.jpg'
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }
  render() {
    const images = [
      "../../../Images/hotel_view.jpg",
      "../../../Images/hotel_view2.jpg",
      "../../../Images/hotel_view.jpg",
      "../../../Images/hotel_view2.jpg",
    ];
    return (
      <div className="image-slider-main-container">
        {images.map((image, index) => (
          <img
            width=""
            height=""
            alt="بلیطجا - اسلایدر"
            src={image}
            className={`${
              index == this.state.currentImage ? "visible-image" : null
            }`}
          />
        ))}
        <div
          className="button-slide next"
          onClick={() => {
            let next = (this.state.currentImage + 1) % images.length;
            this.setState({
              currentImage: next,
            });
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div
          className="button-slide previous"
          onClick={() => {
            let previous = this.state.currentImage - 1;
            previous = previous < 0 ? images.length - 1 : previous;
            this.setState({
              currentImage: previous,
            });
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="image-slider-tumbs-container">
          {images.map((image, index) => (
            <div
              className={`tumbs ${
                index == this.state.currentImage ? "active-image" : null
              }`}
              onClick={() => {
                this.setState({
                  currentImage: index,
                });
              }}
            >
              <img
                width=""
                height=""
                alt="بلیطجا - اسلایدر"
                src={image}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ImageSlider;
