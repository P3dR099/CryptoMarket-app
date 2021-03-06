import React, { useState } from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignUp from '../pages/Signup'
import Login from '../pages/Login'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from './Button';
import { useSelector } from 'react-redux';

export default function FormDialog(props) {
    const matchesMin = useMediaQuery('(min-width:350px)');

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const { setUser } = useSelector(state => state)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(true)
    }

    const handleClose2 = () => {
        setOpen2(false);
    };

    return (
        <>
            {setUser === null && <>

                <Button text="Regístrate" variant="outlined" color="primary" handleModal={handleClickOpen}></Button>
                {matchesMin && <Button text="Inicia Sesión" variant="outlined" color="primary" handleModal={handleClickOpen2}>Inicia Sesión</Button>}

            </>
            }

            <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title-login">
                <DialogTitle>Iniciar Sesión</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Inicia sesión sesión con tu email y contraseña
                    </DialogContentText>
                    <Login {...props} open={open2} setOpen={setOpen2} />
                </DialogContent>
            </Dialog>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title-signup">
                <DialogTitle id="form-dialog-title">Registrarse</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para suscribirse a este sitio web, ingrese su dirección de correo electrónico aquí.
                    </DialogContentText>
                    <SignUp {...props} open={open} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    );
}