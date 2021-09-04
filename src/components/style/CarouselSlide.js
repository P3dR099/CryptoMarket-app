import styled from 'styled-components';
import Slider from "react-slick";

const CarouselSlider = styled(Slider)`
    -webkit-transform: translateX(-34px) translateY(678px);
    
    ${({ matchesMax2, matchesMedH, matchesMinH }) => matchesMax2 && !matchesMedH && matchesMinH ? `
        margin: 0px 22px 0px 64px; -webkit-transform: translateX(-42px) translateY(588px);` :
        `margin:0px 50px 0px 75px;
    `}

    ${({ matchesMax2, matchesMinH, matchesMin2H }) => matchesMax2 && !matchesMinH && matchesMin2H ? `
    margin: 0px 22px 0px 64px; -webkit-transform: translateX(-42px) translateY(530px);` :
        `margin:0px 50px 0px 75px;
    `}

    
    ${({ matchesMax2, matchesMin2H }) => (!matchesMax2 || matchesMax2) && !matchesMin2H ? `
    margin: 0px 22px 0px 64px; -webkit-transform: translateX(-17px) translateY(560px);` :
        `margin:0px 50px 0px 75px;
    `}

    ${({ matchesMedH, matchesMax2 }) => matchesMedH && matchesMax2 && `
     -webkit-transform: translateX(-25px) translateY(750px);` }
     
    
     ${({ matchesMin2, matchesMax2, matchesMaxH }) => matchesMaxH && (matchesMax2 || !matchesMin2) && `
         -webkit-transform: translateX(-40px) translateY(980px);
     `
    }

     
    ${({ matchesMedH, matchesMin2 }) => matchesMedH && matchesMin2 && `
     -webkit-transform: translateX(-40px) translateY(680px);` }
     
    ${({ matchesMin2, matchesMedH }) => !matchesMedH && matchesMin2 ? `-webkit-transform: translateX(-30px) translateY(535px);` :
        `margin:0px 50px 0px 75px;
    `}

    ${({ matchesMin2, matchesMedH }) => !matchesMedH && matchesMin2 ? `-webkit-transform: translateX(-30px) translateY(535px);` :
        `margin:0px 50px 0px 75px;
    `}

    
    .slick - track {
    transform: translate3d(-10px, 0px, 0px);
}
`

export const CarouselMobile = styled(Slider)`
    - webkit - transform: translateX(-228px) translateY(245px);
`

export default CarouselSlider;