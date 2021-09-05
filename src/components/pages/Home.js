import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import CarouselSlider from '../layout/carousel-components/CarouselSlider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";
import CarouselMobiles from '../layout/carousel-components/CarouselMobiles';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';
import '../../scss/Home.scss';
import Button, { ContainerHome, ContainerKid, ContainerSection } from '../style/Home';
import ComponentStart from '../layout/ComponentStart';
import { useSelector } from 'react-redux';


AOS.init()


const Home = (props) => {

    let history = useHistory();
    const matchesMin = useMediaQuery('(max-width:600px)')
    const matchesMedium = useMediaQuery('(max-width:900px)')
    const matchesMax = useMediaQuery('(max-width:1350px)')
    const { setUser } = useSelector(state => state)
    const { getCoins } = props

    const classHome = makeStyles({
        sectionMobile: {
            display: !matchesMedium && 'grid',
            gridTemplateColumns: '60% 40%',
            height: 'inherit',
            alignItems: 'center',
        },

        contSubTitle: {
            marginBlockStart: !matchesMedium ? '1.8rem' : '1.3rem',
            color: 'rgb(223, 227, 235)', fontSize: !matchesMedium ? '1.5rem' : '0.90rem', padding: 0
        },

        contTitleParent: {
            height: '100%',
            display: 'grid', textAlign: '-webkit-left'
        },

        contSectionTitles: {
            padding: !matchesMedium ? '10.5rem 2.5rem' : '7.5rem 1.5rem'
        },


        contBottom: {
            display: 'flex', justifyContent: 'center', paddingTop: '5rem'
        }
    })

    const classes = classHome(matchesMedium)

    useEffect(() => {
        parseInt(localStorage.getItem('value')) === 1 ? getCoins('EUR') : getCoins('USD')
    }, [getCoins])

    return (
        <>
            <ContainerHome matches={matchesMin} matchesMax={matchesMax} >
                <ContainerKid matches={matchesMin}>
                    <Container className={classes.contTitleParent}>
                        <Container className={classes.contSectionTitles} >
                            <h1 className="title">
                                Analiza el mercado de criptomonedas de una manera sencilla y rápida
                            </h1>
                            <Container className={classes.contSubTitle}>
                                Recogemos datos de las apis más confiables del mercado
                                y los mostramos de una forma eficiente para agilizar su análisis
                            </Container>

                            <Container className={classes.contBottom}>
                                <Button onClick={() => history.push('/table')}>
                                    Ir a tabla de precios
                                </Button>
                            </Container>
                        </Container>


                    </Container>
                </ContainerKid>
                <CarouselSlider {...props} />
            </ContainerHome>
            <Grid item xs={12}>
                <ContainerSection matchesMin={!matchesMin} matches={matchesMedium}>
                    <div data-aos="fade-up"
                        data-aos-delay="60"
                        data-aos-duration="1300"
                        style={{ height: 'inherit' }}
                    >
                        <section className={classes.sectionMobile} >
                            <CarouselMobiles />
                        </section>
                    </div>
                </ContainerSection>
            </Grid>
            <Grid item xs={12}>
                <ComponentStart setTheUser={setUser} />
            </Grid>
        </>
    )
}

export default Home