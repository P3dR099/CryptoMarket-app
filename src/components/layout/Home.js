import { Container } from '@material-ui/core';
import React from 'react';
import '../layout/Home.css';
import CarouselSlide from '../layout/CarouselSlide';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Home = (props) => {
    const matchesMin = useMediaQuery('(max-width:450px)');

    return (
        <>
            <Container style={{ maxWidth: 2850, padding: 0 }}>
                <Container style={{ backgroundImage: 'linear-gradient(166deg, rgb(24 61 200) 58%, rgb(244, 244, 244) calc(84% + -7px))', height: !matchesMin ? 970 : 720, padding: 'inherit', maxWidth: 'inherit' }}>
                    <div id="kid">
                        <h1 className="title" >Mercado de Criptomonedas</h1>

                        <Container style={{ padding: 0 }}>

                            <a style={{ color: 'white' }} href="/table">
                                Go to table
                            </a>
                        </Container>
                        <CarouselSlide {...props} />

                    </div>
                </Container>
            </Container>
        </>
    )
}

export default Home