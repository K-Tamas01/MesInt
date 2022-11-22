import './canvas.scss'
import { useRef, useEffect, useContext } from 'react';
import { DrawContext } from '../../Context/DrawContext/draw.context';

const Draw = (() =>{

   const context = useContext(DrawContext)
   const { drawData } = context

    const canvas = useRef();
    let ctx = null;
    
    useEffect(() => {
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;
    
        // get context of the canvas
        ctx = canvasEle.getContext("2d");
    }, [drawData]);
    
    useEffect(() => {
        

    }, [drawData]);
    
    //Vonal rajzolása
    const drawLine = (info, style = {}) => {
        const { x, y, x1, y1 } = info;
        const { color = 'black', width = 1 } = style;
    
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
    }
    return(
        <div>
            <canvas className='canvas-container'
            ref={canvas}
            ></canvas>
        </div>
    );
})

export default Draw