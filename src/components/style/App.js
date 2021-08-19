import styled from "styled-components";

const AppContainer = styled.div`
text-align: center;
background: whitesmoke;
font-size: 15px;
${({ matches }) => !matches && `font-size: 11px;`}
`


export default AppContainer;