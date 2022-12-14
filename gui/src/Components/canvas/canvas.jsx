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

        if(drawData !== null){
            let scale = 1
            let max_x = 0
            let max_y = 0

            drawData.map((route) => {
                max_x = route.coords[0].x
                max_y = route.coords[0].y
                route.coords.map((coord) => {
                    if(max_x < coord.x) max_x = coord.x
                    if(max_y < coord.y) max_y = coord.y
                })
            })

            if(max_x < 20 && max_y < 20){
                scale = 30
            }
            else if((max_x >= 20 && max_x <= 40) || (max_y >= 20 && max_y <= 40)){
                scale = 10
            }else if((max_x > 40 && max_x <= 100) || (max_y > 40 && max_y <= 100)){
                scale = 6
            }else if((max_x > 70 && max_x <= 150) || (max_y > 70 && max_y <= 150)){
                scale = 2
            }

            let colorIndex = 0
            drawData.map((route, rIndex) => {
                const colors = ['black', 'red', 'cyan', 'darkblue', 'green', 'silver', 'orange', 'yellow']
                    
                if(colors.length < rIndex){
                   colorIndex = 0
                }

                route.coords.map((_, index) => {

                    if(route.coords.length > index + 1){
                        drawLine({ x: route.coords[index].x, y: route.coords[index].y, x1: route.coords[index + 1].x, y1: route.coords[index + 1].y, index: route.driverRoute[index], scale: scale}, {color: colors[colorIndex], width: 2})
                    }
                })

                colorIndex++
            })
        }

    }, [drawData]);
    
    //Vonal rajzol??sa
    const drawLine = (info, style) => {

        const { x, y, x1, y1, index, scale } = info;
        
        const { color, width } = style;
    
        ctx.beginPath();
        ctx.font = '25px serif';
        ctx.fillText(index, x*scale, y*scale);
        ctx.moveTo(x * scale, y * scale);
        ctx.lineTo(x1 * scale, y1 * scale);
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