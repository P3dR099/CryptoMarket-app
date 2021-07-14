import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import './Home.css';
import CarouselSlide from '../layout/CarouselSlide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Home = (props) => {
    const matchesMedium = useMediaQuery('(max-width:900px)');

    const useStyles = makeStyles({

        button: {
            borderRadius: 14,
            width: 100,
            color: 'white',
            height: 35,
            background: 'steelblue',
            margin: 25,
            appearance: 'button',
            textDecoration: 'none',
            padding: '8px 0px 0px 3px'
        },

        contHome: {
            maxWidth: 2850, padding: 0, height: '100vh'
        },

        subContHome: {
            padding: 'inherit', maxWidth: 'inherit', height: 'inherit'
        }
    })

    const { getCoins } = props

    useEffect(() => {

        parseInt(localStorage.getItem('value')) === 1 ? getCoins('EUR') : getCoins('USD')

    }, [getCoins])

    const classes = useStyles()

    return (
        <>
            <Container className={classes.contHome}>
                <Container className={classes.subContHome}>
                    <div id="kid">
                        <h1 className="title" style={{ fontSize: !matchesMedium && '50px' }} >Mercado de Criptomonedas</h1>

                        <Container style={{ padding: 0 }}>
                            <Container style={{ marginBlockStart: '15px', color: 'antiquewhite' }}>
                                Analiza el mercado de criptomonedas actualizado minuto a minuto,<br></br>y personalizando el tiempo mostrado sobre cada moneda
                            </Container>
                            <a className={classes.button} href="/table">
                                Go to table
                            </a>
                        </Container>
                    </div>
                    <CarouselSlide {...props} />
                </Container>
            </Container>
        </>
    )
}

export default Home