import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/actions';
import Button from '@material-ui/core/Button';
import Trade from '../../services/trade.service';
const tradeService = new Trade()


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },

    contSignUp: {
        padding: '2rem 2rem 2rem 0rem',
        width: 775,
        alignSelf: 'center'
    }
}));

export default function SignUpForm(props) {

    const classes = useStyles();
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const handleSign = () => {
        tradeService.signup({ username, password })
            .then(res => {
                dispatch(setUser(res.data))
                // props.setTheUser(res.data)

            })
            .then(() => props.setOpen(false))
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <Container className={classes.contSignUp}>
                <TextField
                    id="1"
                    label="Email"
                    style={{ margin: 8 }}
                    placeholder="Introduce tu email"
                    // helperText="Full width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={event => setEmail(event.target.value)}
                    name="email"
                />
                <TextField
                    id="2"
                    label="Contraseña"
                    style={{ margin: 8 }}
                    placeholder="Introduce tu contraseña"
                    // helperText="Full width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={event => setPassword(event.target.value)}
                    name="password"
                    type="password"
                />
                <DialogActions>
                    <Button onClick={() => props.setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSign}>
                        SignUp
                    </Button>
                </DialogActions>
            </Container>
        </div>
    );
}
