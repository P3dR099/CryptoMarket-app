import { Box, Card, Container, Typography } from "@material-ui/core";
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
            style={{ ...style, display: "block", background: "green", left: -10 }}
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
        margin: '0px 0px 1px 50px', width: 155, height: 170, borderRadius: 8, background: '#fff'
    },
    logoCoin: {
        padding: 10,
        width: 50,
    },
    logoCoinMin: {
        padding: 10,
        width: 35,
    },
    priceCoin: {
        fontSize: '1.3rem',
        fontWeight: 700
    }
});


export default function CustomArrows(props) {

    const classes = useStyles();
    const matchesMin = useMediaQuery('(min-width:460px)');
    const matchesMin2 = useMediaQuery('(min-width:740px)');
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

                <Slider {...settings} style={{ margin: '29px 0px 0px 30px', transform: matchesMax2 ? 'translateX(-4px) translateY(185px)' : 'translateX(-4px) translateY(270px)' }} >
                    {props.data.map(function (slide, index) {
                        return (
                            <Container key={index}>
                                <Box boxShadow={4} className={matchesMin ? classes.cardCoin : classes.cardCoinMin}>
                                    <Container style={{ display: 'flex', justifyContent: 'space-between', padding: !matchesMin ? '3px 13px' : 13 }}>
                                        <h3>{slide.name}</h3>
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