import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import CarouselSlider from '../layout/CarouselSlider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";
import './Home.css';
import BtcLogo from '../../logos/btc-logo.png';
import EthLogo from '../../logos/Ethereum-Logo.png';
import GraphAppLogo from '../../logos/app-screenshots/androidTable.png';
import Button, { ContainerHome, ContainerKid, ContainerSection, GraphAppLogoImg } from '../style/Home';
// import { bounce, bounceIn } from 'react-animations';
// import styled, { keyframes } from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init()


const Home = (props) => {

    let history = useHistory();
    const matchesMedium = useMediaQuery('(max-width:700px)')
    const matchesMax = useMediaQuery('(max-width:1350px)')
    const { getCoins } = props

    useEffect(() => {
        parseInt(localStorage.getItem('value')) === 1 ? getCoins('EUR') : getCoins('USD')
    }, [getCoins])


    return (
        <>
            <ContainerHome matches={matchesMedium} matchesMax={matchesMax} >
                <ContainerKid matches={matchesMedium}>
                    <Container style={{ padding: matchesMedium ? '40px 25px 20px 25px' : '130px 25px 20px 25px' }}>
                        <img style={{ width: 30 }} src={BtcLogo} alt="btc logo" />
                        <img style={{ width: 30 }} src={EthLogo} alt="eth logo" />
                        <h1 className="title" style={{ fontSize: !matchesMedium && '3.6rem' }} >Mercado de Criptomonedas</h1>
                        <Container style={{ marginBlockStart: '15px', color: 'antiquewhite' }}>
                            Analiza el mercado de criptomonedas actualizado minuto a minuto,<br></br>y personalizando el tiempo mostrado sobre cada moneda
                        </Container>
                        <Button onClick={() => history.push('/table')}>
                            Go to table
                        </Button>
                    </Container>
                </ContainerKid>
                <CarouselSlider {...props} />
            </ContainerHome>

            <ContainerSection matches={matchesMedium}>

                <div data-aos="fade-up"
                    data-aos-delay="60"
                    data-aos-duration="1300"
                    style={{ height: 'inherit' }}
                >


                    <section style={{ display: !matchesMedium ? 'flex' : 'inline-grid', height: 'inherit', alignItems: 'center' }}>
                        <Container>
                            <h2 style={{ fontFamily: 'sans-serif', fontWeight: 'normal' }}>
                                Aplicación en desarrollo <div />
                                para el analisis del mercado de criptomonedas,<div />
                                más poderoso y fácil de usar
                            </h2>
                        </Container>
                        <Container style={{ alignSelf: 'center' }}>
                            <GraphAppLogoImg matches={matchesMedium} src={GraphAppLogo} />
                        </Container>
                    </section>
                </div>
            </ContainerSection>


        </>
    )
}

export default Home