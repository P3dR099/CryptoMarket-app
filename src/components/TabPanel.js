import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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

const a11yProps = (index) => { return { id: `full-width-tab-${index}`, 'aria-controls': `full-width-tabpanel-${index}`, }; }

const theme2 = createMuiTheme({
    breakpoints: {
        values: {
            xxs: 0,
            xs: 500,
            sm: 650,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
})

const useStyles = makeStyles((width) => ({
    root: {
        backgroundColor: width.palette.background.paper,

        [theme2.breakpoints.up('sm')]: {
            width: 550,
        },
        [theme2.breakpoints.down('xs')]: {
            width: '100%'
        },
    },
    root2: {
        width: 680
    }

}))

export default function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesMax = useMediaQuery('(max-width:1476px)');
    const matchesMin = useMediaQuery('(min-width:400px)');
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={!matchesMax ? classes.root2 : classes.root}>

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
                    <Tab label="1 hora" {...a11yProps(1)} />
                    <Tab label="24 horas" {...a11yProps(0)} />
                    <Tab label="1 mes" {...a11yProps(2)} />
                </Tabs>
            </ul>

            <TabPanel style={{ margin: !matchesMin && '0px 0px 0px -40px' }} value={value} index={0} dir={theme.direction}>
                <GraphCoin value={value} {...props} />
            </TabPanel>
            <TabPanel style={{ margin: !matchesMin ? '0px 0px 0px -30px' : '0px 0px 0px 5px' }} value={value} index={1} dir={theme.direction}>
                <GraphCoin value={value} {...props} />
            </TabPanel>
            <TabPanel style={{ margin: !matchesMin ? '0px 0px 0px -30px' : '0px 0px 0px 5px' }} value={value} index={2} dir={theme.direction}>
                <GraphCoin value={value} {...props} />
            </TabPanel>
        </div>
    );
}