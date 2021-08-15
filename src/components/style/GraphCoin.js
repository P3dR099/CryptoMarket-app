import styled from 'styled-components';

const GraphCoinContainer = styled.div`
        height: 500px;
        margin: 0px 0px 0px;
        padding: 0px;
        ${({ matches }) => matches ? `font-size: 15px;` : `font-size: 12px;`}
        ${({ matchesMax }) => !matchesMax ? `margin-inline-start: -40px;` : `margin-inline-start: -42px;`}
        ${({ matchesMax }) => !matchesMax ? `margin-inline-end: -130px;` : `margin-inline-end: 0px;`}
  `


export default GraphCoinContainer;