import React, { useContext, useRef } from 'react';
import { GradientContext } from '../context/Context';


function SidebarComponent() {

  const { radial, setRadial } = useContext(GradientContext);
  const { direction, setDirection } = useContext(GradientContext);
  const { color1, setColor1 } = useContext(GradientContext);
  const { color2, setColor2 } = useContext(GradientContext);
  const { css, setCss } = useContext(GradientContext);
  const { rgba, setRgba } = useContext(GradientContext);

  const color01 = useRef();
  const color02 = useRef();
  const btnCenter = useRef();
  const h1Gradient = useRef();

  /*
  console.log(c1);
  if (c1 && c2 && gt && gd) {
    setColor1("#" + c1);
    setColor2("#" + c2);
    if (gt === "r") {
      setRadial(true);
    } else {
      setRadial(false)
    }
    switch (gd) {
      case "dtl" : setDirection("top left");
      break;
      case "dt" : setDirection("top");
      break;
      case "dtr" : setDirection("top right");
      break;
      case "dl" : setDirection("left");
      break;
      case "dc" : setDirection("center");
      break;
      case "dr" : setDirection("right");
      break;
      case "dbl" : setDirection("bottom left");
      break;
      case "db" : setDirection("bottom");
      break;
      case "dbr" : setDirection("bottom right");
      break;
      default: setDirection("right");
    } 
    setCodCss();
  }*/

  const setStyle = (rad) => {
    setRadial(rad);
    if (!radial && direction === "center") {
      setDir("right");
    }

    setCodCss();
  }

  const gradientH1On = (e) => {
    e.target.style.background = css;
    e.target.style.color = 'transparent';
    e.target.style.webkitBackgroundClip = 'text';
    
  }

  const gradientH1Off = (e) => {
    e.target.style.background = 'transparent';
    e.target.style.color = 'black';
    
  }

  const setDir = (dir) => {
    setDirection(dir);
    console.log(direction)
    setCodCss();
  }

  const setCodCss = () => {
    let decl = radial ? `radial-gradient(at ${direction}, ${color2}, ${color1})` : `linear-gradient(to ${direction}, ${color1}, ${color2})`;
    setCss(decl);
  }

  const setGradient = () => {
    setColor1(color01.current.value); //revisar como tomar el valor que traje
    setColor2(color02.current.value); //revisar como tomar el valor que traje
    setCodCss();
  }

  setCodCss();

  function setRandomGradient() {
    setColor1("#" + Math.floor(Math.random() * 16777215).toString(16));
    setColor2("#" + Math.floor(Math.random() * 16777215).toString(16));
    color01.current.value = color1;
    color02.current.value = color2;
    setCodCss();
  }

  const getCodeCss = (e) => {
    let content;
    if (rgba) {
      let r1 = parseInt(color1[1] + color1[2], 16);
      let g1 = parseInt(color1[3] + color1[4], 16);
      let b1 = parseInt(color1[5] + color1[6], 16);
      let r2 = parseInt(color2[1] + color2[2], 16);
      let g2 = parseInt(color2[3] + color2[4], 16);
      let b2 = parseInt(color2[5] + color2[6], 16);

      let cssRGBA = radial ? `radial-gradient(at ${direction}, rgba(${r1},${g1},${b1},1.0), rgba(${r2},${g2},${b2},1.0)` :
        `linear-gradient(to ${direction}, rgba(${r1},${g1},${b1},1.0), rgba(${r2},${g2},${b2},1.0)`;
      content = `background: rgba(${r1},${g1},${b1},1.0); \nbackground: ${cssRGBA};`;

    } else {
      content = `background: ${color1}; \nbackground: ${css};`;
    }
    navigator.clipboard.writeText(content)
      .then(() => {
        let contButton = "GET CSS";
        e.target.innerHTML = "Copied to clipboard!";  //cambio a jsx todo 
        setTimeout(() => {
          e.target.innerHTML = contButton;
        }, 4000);
      })
      .catch(err => {
        let contButton = e.target.innerHTML;
        e.target.innerHTML = "Something went wrong";
        setTimeout(() => {
          e.target.innerHTML = contButton;
        }, 4000);
      })
  }

  const getCopyLink = (e) => {
    //http://localhost:3000
    //https://www.css-gradient.com/?c1=cbc0a9&c2=e1b692&gt=l&gd=dtl
    let c1 = color1.substring(1);
    let c2 = color2.substring(1);
    let gt = radial ? "r" : "l";
    let gd = "";
    switch (direction) {
      case "top left" : gd = "dtl";
      break;
      case "top" : gd = "dt";
      break;
      case "top right" : gd = "dtr";
      break;
      case "left" : gd = "dl";
      break;
      case "center" : gd = "dc";
      break;
      case "right" : gd = "dr";
      break;
      case "bottom left" : gd = "dbl";
      break;
      case "bottom" : gd = "db";
      break;
      case "bottom right" : gd = "dbr";
      break;
      default: gd = "r";
    } 

    let content = `http://localhost:3000/?c1=${c1}&c2=${c2}&gt=${gt}&gd=${gd}`;
    navigator.clipboard.writeText(content)
      .then(() => {
        let contButton = "Share Link";
        e.target.innerHTML = "Copied to clipboard!";  //cambio a jsx todo 
        setTimeout(() => {
          e.target.innerHTML = contButton;
        }, 4000);
      })
      .catch(err => {
        let contButton = e.target.innerHTML;
        e.target.innerHTML = "Something went wrong";
        setTimeout(() => {
          e.target.innerHTML = contButton;
        }, 4000);
      })
  }

  return <>
    <aside className='col-md-4'>
      <div className='row my-1 p-3'>
        <div className='col-11 my-1'>
          <h1 onMouseEnter={gradientH1On} onMouseLeave={gradientH1Off} ref={h1Gradient}>CSS GRADIENT GENERATOR</h1>
        </div>

        <div className='col-12 my-1'>
          <h2 className='fs-4'>Style</h2>
          <div className='btn-group d-flex'>
            <button className='btn btn-outline-dark btn-sm' onClick={() => setStyle(false)}>Linear</button>
            <button className='btn btn-outline-dark btn-sm' onClick={() => setStyle(true)}>Radial</button>
          </div>
        </div>
        <h2 className='fs-4 mt-3'>Orientation</h2>
        <div className='btn-group mt-3'>
          <button className='btn btn-outline-dark' onClick={() => setDir("top left")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0v-6z" />
            </svg>
          </button>
          <button className='btn btn-outline-dark' onClick={() => setDir("top")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
            </svg>
          </button>
          <button className='btn btn-outline-dark' onClick={() => setDir("top right")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z" />
            </svg>
          </button>
        </div>
        <div className='btn-group'>
          <button className='btn btn-outline-dark' onClick={() => setDir("left")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>
          <button className='btn btn-outline-dark' ref={btnCenter} onClick={() => setDir("center")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            </svg>
          </button>
          <button className='btn btn-outline-dark' onClick={() => setDir("right")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg>
          </button>
        </div>
        <div className='btn-group mb-3'>
          <button className='btn btn-outline-dark' onClick={() => setDir("bottom left")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0v6z" />
            </svg>
          </button>
          <button className='btn btn-outline-dark' onClick={() => setDir("bottom")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
            </svg>
          </button>
          <button className='btn btn-outline-dark' onClick={() => setDir("bottom right")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z" />
            </svg>
          </button>
        </div>
        <div className='col-12 my-3'>
          <h2 className='fs-4'>Select Colors</h2>
          <div className='btn-group d-flex'>
            <input className='btn btn-outline-dark p-1 pickr' ref={color01} value={color1} onInput={setGradient} type="color" />
            <input className='btn btn-outline-dark p-1 pickr' ref={color02} value={color2} onInput={setGradient} type="color" />
          </div>
          <div className='d-grid gap-2'>
            <button className='mt-2 btn btn-outline-dark btn-sm' onClick={setRandomGradient}>Random</button>
          </div>
        </div>
        <div className='col-12 my-3'>
          <h2 className='fs-4'>Output Format</h2>
          <div className='btn-group d-flex'>
            <button className='btn btn-outline-dark btn-sm' onClick={() => setRgba(false)}>Hex</button>
            <button className='btn btn-outline-dark btn-sm' onClick={() => setRgba(true)}>RGBa</button>
          </div>
        </div>
        <div className='col-12 my-3'>
          <h2 className='fs-4'>Copy Style</h2>
          <div className="btn-group d-flex">
            <button className="btn btn-outline-dark btn-sm" onClick={getCodeCss}>Get CSS</button>
            <button className="btn btn-outline-dark btn-sm" onClick={getCopyLink}>Share Link</button>
          </div>
        </div>
      </div>
    </aside>
  </>
}

export default SidebarComponent;
