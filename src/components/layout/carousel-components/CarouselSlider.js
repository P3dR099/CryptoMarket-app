import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import CarouselSlider from "../../style/CarouselSlide";
import { SampleNextArrow, SamplePrevArrow } from "./CarouselArrowCards";



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
    const matchesMin2 = useMediaQuery('(min-width:550px)');
    const matchesMin = useMediaQuery('(min-width:700px)');
    const matchesMed = useMediaQuery('(min-width:950px)');
    const matchesMax2 = useMediaQuery('(max-width:1350px)');

    const matchesMin2H = useMediaQuery('(min-height:710px)');
    const matchesMinH = useMediaQuery('(min-height:680px)');
    const matchesMedH = useMediaQuery('(min-height:880px)');
    const matchesMaxH = useMediaQuery('(min-height:1080px)');
    const { data } = useSelector(state => state)

    const showSlides = () => {

        if (!matchesMin2) {
            return 1;
        }
        if (!matchesMin) {
            return 2;
        }
        if (!matchesMed) {
            return 3;
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


    return (
        <>
            <Container style={{ padding: 1 }}>
                {data !== undefined &&
                    <CarouselSlider {...settings} matchesMin2H={matchesMin2H} matchesMinH={matchesMinH} matchesMin={!matchesMin} matchesMedH={matchesMedH} matchesMin2={!matchesMin2} matchesMax2={matchesMax2} matchesMaxH={matchesMaxH}>
                        {data.map(function (slide, index) {
                            return (
                                <Container key={index}>
                                    <Box boxShadow={4} className={matchesMin ? classes.cardCoin : classes.cardCoinMin}>
                                        <Container style={{ display: 'flex', justifyContent: 'space-between', padding: matchesMin2 ? '6px 12px 0px 5px' : '12px 15px 0px 0px', alignItems: 'center' }}>
                                            <Container style={{
                                                display: 'inline-grid',
                                                textAlignLast: 'left',
                                                paddingLeft: matchesMin && 10,
                                                paddingRight: 0
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
            </Container>
        </>
    );
}