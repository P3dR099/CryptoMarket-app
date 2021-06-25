import React from 'react';
import Modal from '@material-ui/core/Modal';
import FormModal from './FormModal'
import { Button } from '@material-ui/core';

export default function SimpleModal(props) {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Open modal</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {<FormModal {...props} />}
            </Modal>
        </div >
    );
}