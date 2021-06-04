import { Container } from '@material-ui/core';
import React from 'react';
import '../layout/Home.css'
import CarouselSlide from '../layout/CarouselSlide'

const Home = (props) => {


    return (
        <>
            <Container style={{ maxWidth: 2850, padding: 0 }}>
                <Container style={{ background: '#044e97', height: 580, padding: 'inherit', maxWidth: 'inherit', marginTop: -100 }}>
                    <div id="kid">
                        <h1 className="title" >Mercado de Criptomonedas</h1>
                        <Container style={{ padding: 0 }}>
                            hola
                 <a href="/table">
                                Go to table
                    </a>
                        </Container>
                    </div>

                </Container>
            </Container>
            <CarouselSlide {...props} />
        </>
    )
}

export default Home