import React, { Component } from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;


    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red", right: 0 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green", left: -8 }}
            onClick={onClick}
        />
    );
}

export default function CustomArrows(props) {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    console.log(props)

    let newArr = []
    const newData = props.data !== undefined && newArr.push(props.data.map(el => el))
    console.log(newArr)

    newArr.map(el => console.log(el))
    const showCoins = () => {

        console.log(newArr)
    }

    showCoins()


    return (
        <div>
            <h2>Custom Arrows</h2>

            <Slider {...settings}>
                {/* <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>1</h3>
                </div><div>
                    <h3>1</h3>
                </div> */}
            </Slider>

            {/* 
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider> */}
        </div>
    );

}