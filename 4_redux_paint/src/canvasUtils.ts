import { Point } from "./types"


export const drawStroke = (
    context: CanvasRenderingContext2D, 
    points: Point[],
    color: string 
) => {
    if (!points.length){
        return 
    }
    context.strokeStyle = color 

    context.beginPath()
    context.moveTo(points[0].x, points[0].y)

    points.forEach((point) => {
        context.lineTo(point.x, point.y)  // updates path 
        context.stroke()  // draws the line 
    })
    context.closePath()
}

export const clearCanvas = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d")
    if (!context){
        return
    }
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

export const getCanvasImage = (canvas: HTMLCanvasElement|null):Promise<null|Blob> =>{
    return new Promise((resolve, reject) =>{
        if(!canvas){
            return reject(null)
        }
        canvas.toBlob(resolve)
    })
}