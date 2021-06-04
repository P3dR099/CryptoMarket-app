import React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import GraphCoin from './GraphCoin'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ padding: 2 }} p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((width) => ({
    root: {
        backgroundColor: width.palette.background.paper,
        [width.breakpoints.up('sm')]: {
            width: 500,
        },
        [width.breakpoints.down('xs')]: {
            width: 250
        },
    }
}))

export default function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>

            <ul style={{ marginInlineStart: 0 }} position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    style={{ padding: 0 }}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="1 día" {...a11yProps(0)} />
                    <Tab label="1 hora" {...a11yProps(1)} />
                    <Tab label="1 mes" {...a11yProps(2)} />
                </Tabs>
            </ul>

            <TabPanel value={value} index={0} dir={theme.direction}>
                <GraphCoin value={value} {...props} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <GraphCoin value={value} {...props} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <GraphCoin value={value} {...props} />
            </TabPanel>
        </div>
    );
}