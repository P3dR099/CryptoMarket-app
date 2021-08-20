import styled from "styled-components";

const AppContainer = styled.div`
    text-align: center;
    background: whitesmoke;
    font-size: 15px;
    ${({ matches }) => !matches && `font-size: 11px;`}
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif:
`


export default AppContainer;