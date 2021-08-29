import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import CarouselSlider from '../layout/carousel-components/CarouselSlider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";
import '../../scss/Home.scss';
import Button, { ContainerHome, ContainerKid, ContainerSection } from '../style/Home';
import CarouselMobiles from '../layout/carousel-components/CarouselMobiles';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init()


const Home = (props) => {

    let history = useHistory();
    const matchesMedium = useMediaQuery('(max-width:700px)')
    const matchesMax = useMediaQuery('(max-width:1350px)')
    const { getCoins } = props

    const sectionClass = makeStyles({
        sectionMobile: {
            display: 'flex',
            height: 'inherit',
            alignItems: 'center'
        }
    })

    const classes = sectionClass(matchesMedium)

    useEffect(() => {
        parseInt(localStorage.getItem('value')) === 1 ? getCoins('EUR') : getCoins('USD')
    }, [getCoins])


    return (
        <>
            <ContainerHome matches={matchesMedium} matchesMax={matchesMax} >
                <ContainerKid matches={matchesMedium}>
                    <Container style={{ height: '80%', padding: !matchesMedium ? '8% 8% 4% 8%' : '12% 3% 4% 3%', display: 'grid', alignItems: 'center', textAlign: '-webkit-left' }}>
                        <Container>
                            {/* <img style={{ width: 30 }} src={BtcLogo} alt="btc logo" />
                            <img style={{ width: 30 }} src={EthLogo} alt="eth logo" /> */}
                            <h1 className="title">
                                Analiza el mercado de criptomonedas de una manera sencilla y rápida
                            </h1>
                            <Container style={{ marginBlockStart: !matchesMedium ? '1.8rem' : '1.3rem', color: 'rgb(223, 227, 235)', fontSize: !matchesMedium ? '1.5rem' : '0.90rem', padding: 0 }}>
                                Recogemos datos de las apis más confiables del mercado
                                y los mostramos de una forma eficiente para agilizar su análisis
                            </Container>
                        </Container>
                        <Container style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => history.push('/table')}>
                                Go to table
                            </Button>
                        </Container>
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
                    <section className={classes.sectionMobile} >
                        <Container >
                            <CarouselMobiles />
                        </Container>
                    </section>
                </div>
            </ContainerSection>


        </>
    )
}

export default Home