import React, { Fragment } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FooterContainer from '../style/Footer';

export default function Footer() {

    const useStyles = makeStyles({
        p: {
            margin: 0
        }
    })

    const classes = useStyles()

    return (
        <Fragment>
            <FooterContainer>
                <p className={classes.p} >{new Date().getFullYear()} Todos los derechos reservados</p>
            </FooterContainer>
            {/* <footer className={classes.footer}>  </footer> */}
        </Fragment>
    )
}