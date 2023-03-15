import React, { useState } from 'react';
// import placeholder from '../images/placeholder.png';
// import './style.css';

const ImgPrev = ({state,setState}) => {
    // console.log(state);
    const [{alt, src}, setImg] = useState({
        src: state.image,
        alt: 'Upload an Image'
    });

    const handleImg = (e) => {
        if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
            setState({...state,image:src})
        }   
    }

    return (
        <form encType="multipart/form-data">
                <img
                  width=""
                  height=""
                  src={src}
                  alt="alt"
                  className="img-fluid img-responsive rounded-circle border-black profile-img"
                />
            <div className="form__img-input-container">
                <input 
                    type="file" 
                    accept=".png, .jpg, .jpeg" 
                    id="photo" 
                    className="visually-hidden"
                    onChange={handleImg}
                />
                <label htmlFor="photo" className="form-img__file-label">
                <div className="button-wrapper">
                  <span className="label font-bold-iransanse">
                    تغییر پروفایل
                  </span>
                  </div>
                </label>
            </div>
        </form>
    );
}

export default ImgPrev;