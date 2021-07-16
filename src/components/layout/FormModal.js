import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

export default React.forwardRef((props, ref) => {

    const matches = useMediaQuery('(max-width:450px)');


    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();

        if (!matches) {
            return {
                top: `56%`,
                left: `56%`,
                transform: `translate(-176px, -78px)`,
            }
        }

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: !matches ? 400 : 250,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius: 25
        },
    }));

    const [modalStyle] = React.useState(getModalStyle);
    const classes = useStyles();

    return (
        <>
            <div style={modalStyle} className={classes.paper}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Add new columns</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={props.stateCols.change_1h} onChange={props.handleRows} name="change_1h" />}
                            label="Add 1h change"
                        />
                        <FormControlLabel
                            control={<Switch checked={props.stateCols.change_1d} onChange={props.handleRows} name="change_1d" />}
                            label="Add 1d change"
                        />
                    </FormGroup>
                    <FormHelperText>
                        columns to show the change of 1 hour and 1 day </FormHelperText>
                </FormControl>
            </div>
        </>
    )
})