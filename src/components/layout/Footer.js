import React, { Fragment, Component } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';


export default function Footer() {

    const useStyles = makeStyles({
        footer: {
            background: 'dimgray',
            color: 'white',
            fontSize: '1em',
            textAlign: 'center',
            bottom: 0,
            width: '100%',
            height: 30,
            boxShadow: '0px - 4px 5px 0px rgba(0, 0, 0, 0.75)'
        },
        p: {
            margin: 3
        }
    })
    // -webkit - box - shadow: 0px - 4px 5px 0px rgba(0, 0, 0, 0.75),
    // -moz - box - shadow: 0px - 4px 5px 0px rgba(0, 0, 0, 0.75),


    const classes = useStyles()

    return (
        <Fragment>

            <footer className={classes.footer}> <p className={classes.p} >{new Date().getFullYear()} Todos los derechos reservados</p> </footer>

        </Fragment>
    )

}