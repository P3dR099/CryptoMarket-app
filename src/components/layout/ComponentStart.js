import React from "react";
import { Container } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import mobileTransaction from '../../logos/app-screenshots/wallet-buy.png';
import { ContainerSection } from "../style/Home";
import ContainerGrid from "../style/ComponentStart";

const H2 = styled.h2`
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 2.8rem;
    ${({ matchesMin }) => !matchesMin && `line-height: 1.9rem;`}
    margin: 0px 0px 1rem;
    color: rgb(12, 108, 242);
    margin: 0px 0px 2rem;
    ${({ matchesMin }) => !matchesMin && `font-size: 1.3rem;`}
`

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));

const ComponentStart = () => {

    const matchesMax = useMediaQuery('(min-width:900px)');
    const matchesMin = useMediaQuery('(min-width:600px)');

    return (
        <ContainerSection matchesMin={matchesMin} style={{ height: 'auto' }}>
            <ContainerGrid container spacing={3}>

                {/* <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid> */}
                <Grid item xs={matchesMax ? 6 : 12}>
                    <img alt="mobile-transaction" style={{ width: matchesMax ? 'auto' : '13rem' }} src={mobileTransaction} />
                </Grid>
                <Grid item xs={matchesMax ? 6 : 12}>
                    <Container style={{ paddingLeft: '0.8rem', textAlign: 'start', padding: '2% 5%' }}>
                        <H2 matchesMin={matchesMin}>Crea tu cuenta para personalizar aún más la experiencia</H2>
                    </Container>
                    <Container>
                        <Container style={{ color: 'rgb(12, 108, 242)', border: '1.5px solid rgb(15, 62, 110)', borderRadius: '1rem', margin: '1rem 0rem' }}>
                            <h3 style={{ color: 'rgb(12, 108, 242)', fontWeight: 400 }}>Guarde las criptomonedas que quiera a favoritos</h3>
                        </Container>
                        <Container style={{ color: 'rgb(12, 108, 242)', border: '1.5px solid rgb(15, 62, 110)', borderRadius: '1rem', margin: '1rem 0rem' }}>
                            <h3 style={{ color: 'rgb(12, 108, 242)', fontWeight: 400 }}>Próximamente, podrá hacer pagos de un forma segura</h3>
                        </Container>
                        <Container style={{ color: 'rgb(12, 108, 242)', border: '1.5px solid rgb(15, 62, 110)', borderRadius: '1rem', margin: '1rem 0rem' }}>
                            <h3 style={{ color: 'rgb(12, 108, 242)', fontWeight: 400 }}>Aplicación centrada en la descentralización y en la seguridad hacia el usuario</h3>
                        </Container>
                    </Container>
                </Grid>
            </ContainerGrid>
        </ContainerSection>
    )

}

export default ComponentStart;