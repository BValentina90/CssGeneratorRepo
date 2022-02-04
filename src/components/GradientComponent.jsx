import React, { useContext } from 'react';
import { GradientContext } from '../context/Context';


function GradientComponent(props) {

    const { css } = useContext(GradientContext);

    return (
        <section id='gradientCanvas' className='col-md-8' style={{ background: css }}>

        </section>
    );
}

export default GradientComponent;
