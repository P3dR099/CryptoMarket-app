import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
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

    }

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: !matchesMax2 ? 5 : showSlides(),
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const carouselPosition = document.querySelectorAll('.slick-track')
    if (carouselPosition[0] !== undefined && !matchesMin) carouselPosition[0].style.transform = "translate3d(-0.5%, 0px, 0px)"
    // if (carouselPosition[0] !== undefined && !matchesMin) console.log(carouselPosition[0].style)
    // if (carouselPosition[0] !== undefined && matchesMed) carouselPosition[0].style.transform = "translate3d(-1.45%, 0px, 0px)"

    return (
        <>

            {props.data !== undefined &&
                <CarouselSlider {...settings} matchesMin={!matchesMin} matchesMin2={!matchesMin2} >
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