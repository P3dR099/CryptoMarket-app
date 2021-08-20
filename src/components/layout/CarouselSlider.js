import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
// import Slider from "react-slick";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Link } from "react-router-dom";
import CarouselSlider from "../style/CarouselSlide";

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

const useStyles = makeStyles({
    root: {
        minWidth: 27,
        margin: 10
    },
    cardCoin: {
        margin: '0px 0px 1px 0px', width: '100%', height: 170, borderRadius: 8, background: '#fff'
    },
    cardCoinMin: {
        margin: '0px 0px 1px 0px', height: 170, borderRadius: 8, background: '#fff', width: '100%'
    },
    logoCoin: {
        padding: 10,
        width: 50,
    },
    logoCoinMin: {
        padding: 10,
        width: 40,
    },
    priceCoin: {
        fontSize: '1.3rem',
        fontWeight: 700
    }
});


export default function CustomArrows(props) {

    const classes = useStyles();

    const matchesHeight = useMediaQuery('(min-height:1000px)');
    const matchesMin = useMediaQuery('(min-width:460px)');
    const matchesMin2 = useMediaQuery('(min-width:700px)');
    const matchesMed = useMediaQuery('(min-width:1090px)');
    const matchesMax = useMediaQuery('(max-width:1100px)');
    const matchesMax2 = useMediaQuery('(max-width:1350px)');

    const showSlides = () => {

        if (!matchesMin) {
            return 1;
        }
        if (!matchesMin2) {
            return 2;
        }
        if (!matchesMed) {
            return 3;
        }
        if (!matchesMax) {
            return 4
        }
        if (!matchesMax2) {
            return 5
        }
        return 4
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: showSlides(),
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const name = () => {

        if (!matchesMin) {
            const slickTrack = document.querySelectorAll('.slick-track')[0] !== undefined ? document.querySelectorAll('.slick-track')[0].style = "transform: translate3d(0px, 0px, 0px); width: 60032px;" : undefined;
        }
        if (!matchesMin) {
            const slickTrack = document.querySelectorAll('.slick-track')[0] !== undefined ? document.querySelectorAll('.slick-track')[0].style = "transform: translate3d(0px, 0px, 0px); width: 37032px;" : undefined;
        }
        if (!matchesMed) {
            const slickTrack2 = document.querySelectorAll('.slick-track')[0] !== undefined ? document.querySelectorAll('.slick-track')[0].style = "transform: translate3d(10px, 0px, 0px); width: 37032px;" : undefined;
        }

        if (matchesMax) {
            const slickTrack2 = document.querySelectorAll('.slick-track')[0] !== undefined ? document.querySelectorAll('.slick-track')[0].style = "transform: translate3d(3px, 0px, 0px); width: 37032px;" : undefined;
        }
        else {
            const slickTrack2 = document.querySelectorAll('.slick-track')[0] !== undefined ? document.querySelectorAll('.slick-track')[0].style = "transform: translate3d(7px, 0px, 0px); width: 67032px;" : undefined;
        }

    }

    name()

    return (
        <>

            {props.data !== undefined &&
                <CarouselSlider {...settings} matchesMin={!matchesMin} matchesMin2={!matchesMin2} matchesMax2={matchesMax2} matchesHeight={matchesHeight}>
                    {props.data.map(function (slide, index) {
                        return (
                            <Container key={index}>
                                <Box boxShadow={4} className={matchesMin ? classes.cardCoin : classes.cardCoinMin}>
                                    <Container style={{ display: 'flex', justifyContent: 'space-between', padding: matchesMin2 ? '3px 12px 0px 7px' : '12px 15px 0px 0px', alignItems: 'center' }}>
                                        <Container style={{
                                            display: 'inline-grid',
                                            textAlignLast: 'left',
                                            paddingLeft: matchesMin && 10
                                        }}>

                                            <h3 style={{ marginTop: '3px', marginLeft: 0, fontSize: 'initial', alignSelf: 'baseline', marginBottom: 'auto', textAlign: '-webkit-left' }}>{slide.name}</h3>
                                            <h3 style={{
                                                color: 'gray', fontSize: 13, opacity: 0.7, marginBlock: 'auto'
                                            }}>{slide.symbol}</h3>
                                        </Container>


                                        <Link to={"/coin/" + slide.id} style={{ textDecoration: 'none', color: 'inherit' }} >
                                            <img alt="coin" className={!matchesMin ? classes.logoCoinMin : classes.logoCoin} style={{ padding: !matchesMin2 && 0 }} src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${slide.id}.png`} />
                                        </Link>
                                    </Container>
                                    <Typography className={classes.priceCoin}>
                                        {slide.price > 1 ? slide.price.toFixed(2) : slide.price.toFixed(4)}
                                    </Typography>

                                    {slide.change_1d > 0 ?
                                        <Typography>
                                            <ArrowUpwardIcon style={{ width: 15, verticalAlign: 'top', color: 'green' }} />{slide.change_1d.toFixed(2)}
                                        </Typography> :
                                        <Typography>
                                            <ArrowDownwardIcon style={{ width: 15, verticalAlign: 'top', color: 'red' }} />{slide.change_1d.toFixed(2)}
                                        </Typography>
                                    }
                                </Box>
                            </Container>
                        )
                    })}
                </CarouselSlider>
            }
        </>
    );
}