import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: '#225a93',
        '&:hover': {
            backgroundColor: '#651ef0',
        },

    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: '0.5rem 0.5rem',
        borderRadius: 10,
        width: '7rem',
        padding: '0.5rem',
        fontSize: '0.7rem'
    },
}));


export default function MaterialButton(props) {

    const classes = useStyles();
    let history = useHistory();

    return (
        <ColorButton variant="contained" color="primary" style={{ bottom: props.marginTop && '2.5rem' }} onClick={props.route ? () => history.push(props.route) : props.handleModal} className={classes.margin}>
            {props.text}
        </ColorButton>

    );
}
