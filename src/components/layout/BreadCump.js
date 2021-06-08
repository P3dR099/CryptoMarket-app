import React from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from "react-router-dom";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {

        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function CustomizedBreadcrumbs() {

    let history = useHistory();
    function handleClick(event) {
        event.preventDefault();
        history.push('/');
    }
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ padding: "5px 0px", margin: '55px 0px 80px 0px' }}>
            <div>
                <StyledBreadcrumb
                    component="a"
                    href="/"
                    label="Home"
                    icon={<HomeIcon fontSize="small" />}
                    onClick={handleClick}
                />
            </div>
            <StyledBreadcrumb style={{ marginTop: 0 }} component="a" href="#" label="Coins" onClick={handleClick} />
        </Breadcrumbs>
    );
}
