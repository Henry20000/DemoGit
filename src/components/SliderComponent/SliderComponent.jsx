import React from "react";
import { Image } from "antd";
import { WrapperSliderStyle } from "./style";


// eslint-disable-next-line react/prop-types
const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay : true,
        autoplaySpeed: 3000
    };
    return (
        <WrapperSliderStyle {...settings}>
            {arrImages && arrImages.length > 0 && arrImages.map((image) => {    
                return (
                    <Image key={image}src={image} alt="slider" preview={false}  width= "100%" height="274px" />
                )
            })}
        </WrapperSliderStyle>
    )
}

export default SliderComponent