import React, {useState} from 'react';

export const GradientContext = React.createContext();

//Declaro mis variables globales
const Context = (props) => {

    const [radial, setRadial] = useState(false);
    const [direction, setDirection] = useState("right");
    const [color1, setColor1] = useState("#ff0000");
    const [color2, setColor2] = useState("#ffff00");
    const [css, setCss] = useState('');
    const [rgba, setRgba] = useState(false);

    return (
        <GradientContext.Provider value={{radial, setRadial, direction, setDirection, color1, setColor1, color2, setColor2, css, setCss, rgba, setRgba}}>
            {props.children}
        </GradientContext.Provider>
    )
}

export default Context;
