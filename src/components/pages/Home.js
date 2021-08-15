import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import CarouselSlider from '../layout/CarouselSlider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";
import './Home.css';
import BtcLogo from '../../logos/btc-logo.png';
import EthLogo from '../../logos/Ethereum-Logo.png';
import Button, { ContainerHome, ContainerKid, ContainerSection, ContainerParentSection } from '../style/Home';
// import Greeter from '../../artifacts/contracts/Greeter.sol/Greeter.json';


const Home = (props) => {

    let history = useHistory();
    const matchesMedium = useMediaQuery('(max-width:700px)');
    const { getCoins } = props

    useEffect(() => {
        parseInt(localStorage.getItem('value')) === 1 ? getCoins('EUR') : getCoins('USD')
    }, [getCoins])

    return (
        <>
            <ContainerHome>
                <ContainerKid matches={matchesMedium}>
                    <Container style={{ padding: matchesMedium ? '40px 25px 20px 25px' : '130px 25px 20px 25px' }}>
                        <img style={{ width: 50 }} src={BtcLogo} />
                        <img style={{ width: 80 }} src={EthLogo} />
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
            <ContainerParentSection matches={matchesMedium}>

                <ContainerSection matches={matchesMedium}>
                    <section>
                        <h2>
                            El monedero de criptomonedas más poderoso y fácil de usar
                        </h2>
                    </section>
                </ContainerSection>
            </ContainerParentSection>
        </>
    )
}

export default Home