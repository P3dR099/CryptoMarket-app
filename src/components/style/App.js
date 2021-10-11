import { Typography } from "@material-ui/core";
import styled from "styled-components";

const AppContainer = styled.div`
    text-align: center;
    background: whitesmoke;
    font-size: 15px;
    ${({ matches }) => !matches && `font-size: 11px;`}
    font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
`


export const ParraphMessage = styled.div`
    margin: .7rem 0rem 0.5rem;
    width: fit-content;
    border: 1.5px solid;
    padding: 0.3rem 1rem;
    border-radius: 0.8rem;
    border-color: #000046;
`

export const TypographyTitle = styled(Typography)`

    font-weight: bold;
    text-transform: uppercase;
    color: rgb(118, 69, 217);
    font-size: 0.8rem;

`

export default AppContainer;