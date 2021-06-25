import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Link } from "react-router-dom";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style, display: "block", right: -40, borderRadius: '50%', display: 'block',
                background: 'cornflowerblue', right: -33, width: 23, height: 20, paddingTop: 3.6
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
                ...style, display: "block", left: -10, borderRadius: '50%', display: 'block',
                background: 'cornflowerblue', right: -40, width: 23, height: 20, paddingTop: 3.6
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
        margin: '0px 0px 1px 0px', width: 245, height: 170, borderRadius: 8, background: '#fff'
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
    const matchesMin2 = useMediaQuery('(min-width:770px)');
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

    return (

        <>
            {props.data !== undefined &&

                <Slider {...settings} style={{ margin: !matchesMax2 ? '0px 22px 0px 64px' : '0px 35px 0px 86px', transform: matchesMax2 ? 'translateX(-42px) translateY(465px)' : 'translateX(-34px) translateY(560px)', paddingLeft: !matchesMin || !matchesMax2 ? 25 : 0 }} >
                    {props.data.map(function (slide, index) {
                        return (
                            <Container key={index}>
                                <Box boxShadow={4} className={matchesMin ? classes.cardCoin : classes.cardCoinMin}>
                                    <Container style={{ display: 'flex', justifyContent: 'space-between', padding: !matchesMin ? '3px 8px 0px 15px' : '5px 15px', alignItems: 'center' }}>
                                        <h3 style={{ marginLeft: 0, fontSize: 'initial' }}>{slide.name}</h3>
                                        <h3 style={{
                                            color: 'gray', fontSize: 13, position: 'absolute', transform: 'translateY(20px)', fontWeight: 500, opacity: 0.7, paddingTop: 1
                                        }}>{slide.symbol}</h3>
                                        <Link to={"/coin/" + slide.id} style={{ textDecoration: 'none', color: 'inherit' }} >
                                            <img className={!matchesMin ? classes.logoCoinMin : classes.logoCoin} src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${slide.id}.png`} />
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
                </Slider>
            }
        </>
    );
}