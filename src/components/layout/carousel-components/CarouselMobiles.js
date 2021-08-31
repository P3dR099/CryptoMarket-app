import { Container } from "@material-ui/core";
import React, { useState } from "react";
import CarouselMobile from "../../style/CarouselMobiles";
import arrImages from '../../utils/arrImages'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from "@material-ui/icons/ArrowBack";
import SamplePrevArrow, { SampleNextArrow } from "./CarouselArrowMobile";
import '../../../scss/CarouselMobile.scss';


const CarouselMobiles = () => {

    const matches = useMediaQuery('(min-width:700px)');
    const matchesMax = useMediaQuery('(min-width:900px)');
    const matchesMaxText = useMediaQuery('(min-width:1030px)');



    const settingsNormal = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow logo={<ArrowForward style={{ color: 'black' }} />} />,
        prevArrow: <SamplePrevArrow logo={<ArrowBack style={{ color: 'black' }} />} />
    };

    const handleClick = (event) => {

        if (event.target.id === 1) {

            document.querySelectorAll('.container-slick-dots1')[0].style += "; text-align: -webkit-left; border: 1px solid rgb(96 79 182); border-radius: 0.8rem; height: 4.5rem; padding-top: 2%;"
            event.target.style.color = '#2e8cee'
        }

        if (event.target.id === 2) {

            document.querySelectorAll('.container-slick-dots0')[0].style += "; text-align: -webkit-left; border: 1px solid rgb(96 79 182); border-radius: 0.8rem; height: 4.5rem; padding-top: 2%;"
            event.target.style.color = '#2e8cee'
        }
    }


    const settingsSlickTitle = {
        customPaging: function (i) {
            return (
                <Container style={{ display: 'flex' }}>
                    <Container className={`container-slick-dots${i}`} style={{ fontSize: !matchesMaxText && '0.8rem', width: '100%', textAlign: '-webkit-left', border: '1px solid rgb(96 79 182)', borderRadius: '0.8rem', height: '4.5rem', paddingTop: '2%' }} id={arrImages[i].id} onClick={handleClick}>
                        {arrImages[i].title}
                    </Container>
                </Container>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const settigns = matchesMax ? settingsSlickTitle : settingsNormal

    return (
        <>
            <div></div>

            <CarouselMobile {...settigns} style={{ textAlignLast: 'left' }} className="slick-dots-carousel" >
                {arrImages.map((slide, index) => {
                    return (
                        <div key={index}>
                            <Container style={{
                                display: 'grid',
                                justifyContent: 'center'
                            }} key={index}>

                                <img style={{ width: matches ? 100 : 85, transform: 'skewX(12deg)', justifySelf: 'center' }} src={slide.src} alt="mobile" />

                                {!matchesMax &&
                                    <Container style={{ alignSelf: 'center', textAlign: '-webkit-left' }}>
                                        <h2 style={{ fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: matches ? '1.2rem' : '0.9rem', marginTop: !matches && '20%' }}>
                                            {slide.title}
                                        </h2>
                                    </Container>
                                }
                            </Container>
                        </div>
                    )
                })}

            </CarouselMobile>
        </>
    )


}

export default CarouselMobiles;