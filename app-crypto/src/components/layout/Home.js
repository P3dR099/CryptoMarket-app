import { Container } from '@material-ui/core';
import React from 'react';
import '../layout/Home.css'
import CarouselSlide from '../layout/CarouselSlide'

const Home = (props) => {

    const SLIDE_INFO = [
        { backgroundColor: '#ff7c7c', title: 'Slide 1' },
        { backgroundColor: '#ffb6b9', title: 'Slide 2' },
        { backgroundColor: '#8deaff', title: 'Slide 3' },
        { backgroundColor: '#ffe084', title: 'Slide 4' },

    ];


    return (
        <>
            <Container style={{ maxWidth: 1600, padding: 0 }}>
                <Container style={{ background: '#044e97', height: 470, padding: 'inherit', maxWidth: 'inherit', marginTop: -70 }}>
                    <div id="kid">
                        <h1>Mercado de Criptomonedas</h1>
                    </div>
                </Container>
                <Container>
                    <CarouselSlide {...props} />
                </Container>
            </Container>
        </>
    )
}

export default Home