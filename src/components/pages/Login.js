import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import { setUser } from '../../actions/actions';
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

    contLogin: {
        alignSelf: 'center',
        padding: '2rem 2rem 2rem 0rem',
        width: 775
    },

}));

export default function LoginForm(props) {

    const classes = useStyles();
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const handleSign = () => {
        tradeService.login({ username, password })
            .then(res => {
                // props.setTheUser(res.data)
                dispatch(setUser(res.data))
                localStorage.setItem('login', JSON.stringify({ username, password }))
            })
            .then(() => props.setOpen(false))
            .catch(err => console.log(err))
    }


    return (
        <div className={classes.root}>
            <Container className={classes.contLogin}>
                <TextField
                    id="form-login1"
                    label="Email"
                    style={{ margin: 8 }}
                    placeholder="Introduce tu email"
                    helperText="Introduce tu email para iniciar sesión"
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
                    id="form-login2"
                    label="Contraseña"
                    placeholder="Introduce tu contraseña"
                    helperText="Introduce tu contraseña para iniciar sesión"
                    fullWidth
                    margin="normal"
                    style={{ margin: 8 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={event => setPassword(event.target.value)}
                    name="password"
                    type="password"
                />
                <DialogActions>
                    <Button onClick={() => props.setOpen && props.setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSign}>
                        Login
                    </Button>
                </DialogActions>
            </Container>
        </div>
    );
}
