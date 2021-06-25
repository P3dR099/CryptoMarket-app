import { Container } from '@material-ui/core';
import React from 'react';
import '../layout/Home.css';
import CarouselSlide from '../layout/CarouselSlide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Home = (props) => {
    const matches = useMediaQuery('(max-width:1350px)');
    const matchesMedium = useMediaQuery('(max-width:900px)');

    const useStyles = makeStyles({

        button: {
            borderRadius: 14,
            width: 100,
            color: 'white',
            height: 35,
            background: 'blue',
            margin: 25,
            appearance: 'button',
            textDecoration: 'none',
            padding: '8px 0px 0px 3px'
        }
    })

    const classes = useStyles()

    return (
        <>
            <Container style={{ maxWidth: 2850, padding: 0 }}>
                <Container style={{ backgroundImage: 'linear-gradient(166deg, rgb(77, 168, 218) 58%, rgb(244, 244, 244) calc(84% + -7px))', height: !matches ? 1200 : 739, padding: 'inherit', maxWidth: 'inherit' }}>
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