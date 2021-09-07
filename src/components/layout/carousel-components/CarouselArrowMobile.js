import React from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CarouselArrowPrev } from "../../style/CarouselMobiles";
import { CarouselArrowNext } from "../../style/CarouselMobiles";

const SamplePrevArrow = (props) => {

    const matches = useMediaQuery('(min-width:800px)');
    const { className, style, onClick, logo } = props;

    return (
        <div>

            <CarouselArrowPrev
                logo={logo}
                className={className}
                style={{
                    ...style, borderRadius: '15%',
                    display: 'flex', justifyContent: 'center',
                    background: 'transparent', right: -40, top: '16rem',
                    left: '-2rem', width: matches ? 50 : 40,
                    height: matches ? 30 : 28, paddingTop: 2.5,
                    border: '1px solid #1cb5e0'
                }}
                onClick={onClick}
            >
                {logo}
            </CarouselArrowPrev>
        </div>
    );
}

export function SampleNextArrow(props) {

    const matches = useMediaQuery('(min-width:800px)');
    const { className, style, onClick, logo } = props;

    return (
        <CarouselArrowNext
            className={className}
            style={{
                ...style, borderRadius: '15%', display: 'flex', justifyContent: 'center',
                background: 'transparent', right: -33, width: matches ? 50 : 40,
                height: matches ? 30 : 28, paddingTop: 2.5, top: '16rem',
                left: matches ? '4rem' : '1rem', border: '1px solid #1cb5e0'
            }}
            onClick={onClick}

        >
            {logo}
        </CarouselArrowNext>
    );
}


export default SamplePrevArrow;