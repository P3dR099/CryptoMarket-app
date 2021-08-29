import { Container } from "@material-ui/core";
import React from "react";
import CarouselMobile from "../../style/CarouselMobiles";
import arrImages from '../../utils/arrImages'
import useMediaQuery from '@material-ui/core/useMediaQuery';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style, borderRadius: '50%', display: 'block',
                background: 'cornflowerblue', right: -33, width: 23, height: 20, paddingTop: 2.5
            }}
            onClick={onClick}

        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style, left: -10, borderRadius: '50%', display: 'block',
                background: 'cornflowerblue', right: -40, width: 23, height: 20, paddingTop: 2.5
            }}
            onClick={onClick}
        />
    );
}

const CarouselMobiles = () => {

    const matches = useMediaQuery('(min-width:700px)');

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <>

            <CarouselMobile {...settings}>

                {arrImages.map((slide, index) => {
                    return (
                        <div key={index}>
                            <Container style={{ display: matches && 'flex', textAlign: '-webkit-center' }} key={index}>
                                <Container style={{ alignSelf: 'center' }}>
                                    <h2 style={{ fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: matches ? '1.2rem' : '1rem' }}>
                                        Aplicación en desarrollo <div />
                                        para el analisis del mercado de criptomonedas,<div />
                                        más poderoso y fácil de usar
                                    </h2>
                                </Container>
                                <Container style={{ marginTop: !matches && '30%' }}>
                                    <img style={{
                                        width: matches ? 100 : 85, transform: 'skewX(12deg)'
                                    }} src={slide.src} alt="mobile" />
                                </Container>
                            </Container>
                        </div>
                    )
                })}
            </CarouselMobile >
        </>
    )


}

export default CarouselMobiles;