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
import { bounceIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import "animate.css/animate.min.css";

// import Greeter from '../../artifacts/contracts/Greeter.sol/Greeter.json';

const bounceAnimation = keyframes`${bounceIn}`;

const BouncyDiv = styled.div`
    transform: translateY(190px);

    -webkit-animation: 3.5s ${bounceAnimation};
}
`;

const Home = (props) => {

    let history = useHistory();
    const matchesMedium = useMediaQuery('(max-width:700px)')
    const { getCoins } = props

    const handleEvent = (event) => {
        console.log(event)
        console.log('hola')
    }


    useEffect(() => {
        parseInt(localStorage.getItem('value')) === 1 ? getCoins('EUR') : getCoins('USD')
    }, [getCoins])


    return (
        <>
            <ContainerHome>
                <ContainerKid matches={matchesMedium}>
                    <Container style={{ padding: matchesMedium ? '40px 25px 20px 25px' : '130px 25px 20px 25px' }}>
                        <img style={{ width: 30 }} src={BtcLogo} alt="btc logo" />
                        <img style={{ width: 30 }} src={EthLogo} alt="eth logo" />
                        <h1 className="title" style={{ fontSize: !matchesMedium && '50px' }} >Mercado de Criptomonedas</h1>
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
            <ContainerSection matches={matchesMedium} >
                {/* {console.log(window.screen)} */}
                <ScrollAnimation animateIn="fadeIn">
                    <section>
                        <h2>
                            Aplicación en desarrollo <div />
                            para el analisis del mercado de criptomonedas,<div />
                            más poderoso y fácil de usar
                        </h2>
                        <GraphAppLogoImg src={GraphAppLogo} />
                    </section>

                </ScrollAnimation>
            </ContainerSection>
        </>
    )
}

export default Home