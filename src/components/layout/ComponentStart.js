import React from "react";
import { Container } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import mobileTransaction from '../../logos/app-screenshots/wallet-buy.png';
import { ContainerSection } from "../style/Home";
import ContainerGrid from "../style/ComponentStart";
import FormDialog from '../layout/ModalAuth';


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

const H3 = styled.h3`
    color: rgb(12, 108, 242); font-weight: 400
`

const ContainerH3 = styled(Container)`
    color: rgb(12, 108, 242); border: 0.125rem solid rgb(222, 216, 253);
    border-radius: 1rem; margin: 1rem 0rem;
`

const ContainerH2 = styled(Container)`
    paddingLeft: 0.8rem; textAlign: start; padding: 2% 5%;
`

const ComponentStart = (props) => {

    const matchesMin = useMediaQuery('(min-width:600px)');
    const matchesMax = useMediaQuery('(min-width:900px)');

    return (
        <ContainerSection matchesMin={matchesMin} style={{ height: 'auto' }}>
            <ContainerGrid container spacing={3}>
                <Grid item xs={matchesMax ? 6 : 12}>
                    <img alt="mobile-transaction" style={{ width: matchesMax ? 'auto' : '13rem' }} src={mobileTransaction} />
                </Grid>
                <Grid item xs={matchesMax ? 6 : 12}>
                    <ContainerH2>
                        <H2 matchesMin={matchesMin}>Crea tu cuenta para personalizar aún más la experiencia</H2>
                    </ContainerH2>
                    <Container>
                        <ContainerH3>
                            <H3>Guarde las criptomonedas que quiera a favoritos</H3>
                        </ContainerH3>
                        <ContainerH3>
                            <H3>Próximamente, podrá hacer pagos de un forma segura</H3>
                        </ContainerH3>
                        <ContainerH3>
                            <H3>Aplicación centrada en la descentralización y en la seguridad hacia el usuario</H3>
                        </ContainerH3>
                    </Container>
                </Grid>
            </ContainerGrid>
        </ContainerSection>
    )

}

export default ComponentStart;