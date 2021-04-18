import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
}));

export default function SignUpForm(props) {
    const classes = useStyles();
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSign = () => {
        tradeService.signup({ username, password })
            .then(res => {
                console.log(res.data)
                props.setTheUser(res.data)

            })
            .then(() => props.setOpen(false))
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <div>
                <TextField
                    id="1"
                    label="Email"
                    style={{ margin: 8 }}
                    placeholder="Introduce tu email"
                    helperText="Full width!"
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
                    helperText="Full width!"
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
            </div>
        </div>
    );
}
