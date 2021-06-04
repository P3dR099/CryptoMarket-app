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
            style={{ ...style, display: "block", background: "red", right: -30 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green", left: -22 }}
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
        margin: '0px 70px 1px 20px', width: 245, height: 170, borderRadius: 8, background: '#fff'
    },
    cardCoinMin: {
        margin: '0px 70px 1px 20px', width: 155, height: 170, borderRadius: 8, background: '#fff'
    },
    logoCoin: {
        padding: 10,
        width: 50,
    },
    priceCoin: {
        fontSize: '1.3rem',
        fontWeight: 700
    }
});


export default function CustomArrows(props) {

    const classes = useStyles();
    const matches = useMediaQuery('(min-width:1150px)');
    const matchesMed = useMediaQuery('(min-width:860px)');
    const matchesMin = useMediaQuery('(min-width:560px)');
    const matchesMax = useMediaQuery('(max-width:1150px)');


    const showSlides = () => {

        if (!matchesMin) {
            return 1;
        }
        if (!matchesMed) {
            return 2;
        }
        if (!matches) {
            return 3
        }

    }

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: !matchesMax ? 4 : showSlides(),
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (

        <>
            {props.data !== undefined &&

                <Slider {...settings} style={{ margin: '-80px 70px' }} >
                    {props.data.map(function (slide, index) {
                        return (
                            <div key={index}>
                                <Box boxShadow={4} className={matchesMin ? classes.cardCoin : classes.cardCoinMin}>
                                    <Container style={{ display: 'flex', justifyContent: 'space-between', padding: 13 }}>
                                        <h3>{slide.name}</h3>
                                        <Link to={"/coin/" + slide.id} style={{ textDecoration: 'none', color: 'inherit' }} >
                                            <img className={classes.logoCoin} src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${slide.id}.png`} />
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
                            </div>
                        )
                    })}
                </Slider>
            }
        </>
    );

}