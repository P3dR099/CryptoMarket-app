import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from 'clsx';

const colChange_1h = {
    renderCell: (params) => (
        <>
            {params.row.change_1h > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            <p>{params.row.change_1h.toFixed(2)}%</p>
        </>
    ),
    field: 'change_1h', headerName: '%1h', width: 130, type: 'number', cellClassName: (params) => clsx('super-app', { negative: params.value < 0, positive: params.value > 0 })
}

export const colChange_1d = {
    renderCell: (params) => (
        <>
            {params.row.change_1d > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            <p>{params.row.change_1d.toFixed(2)}%</p>
        </>
    ),
    field: 'change_1d', headerName: '%24h', width: 130, type: 'number', cellClassName: (params) => clsx('super-app', { negative: params.value < 0, positive: params.value > 0 })
}

export default colChange_1h;