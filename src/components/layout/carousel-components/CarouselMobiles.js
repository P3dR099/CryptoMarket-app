import { Container } from "@material-ui/core";
import React from "react";
import CarouselMobile from "../../style/CarouselMobiles";
import arrImages from '../../utils/arrImages'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from "@material-ui/icons/ArrowBack";
import SamplePrevArrow, { SampleNextArrow } from "./CarouselArrowMobile";

const CarouselMobiles = () => {

    const matches = useMediaQuery('(min-width:700px)');

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow logo={<ArrowForward style={{ color: 'black' }} />} />,
        prevArrow: <SamplePrevArrow logo={<ArrowBack style={{ color: 'black' }} />} />
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
                                        {slide.title}
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