import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { currentStrokeSelector, beginStroke, updateStroke, endStroke } from './modules/currentStroke'
import { strokesSelector } from './modules/strokes'
import { historyIndexSelector } from './modules/historyIndex'
import { drawStroke, clearCanvas } from "./canvasUtils"
import { ColorPanel } from "./shared/ColorPanel"
import { EditPanel } from './shared/EditPanel';
import { useCanvas } from "./CanvasContext"
import { FilePanel } from './shared/FilePanel';

function App() {
  const canvasRef = useCanvas()  // useRef<HTMLCanvasElement>(null)
  const currentStroke = useSelector(currentStrokeSelector)
  const strokes = useSelector(strokesSelector)
  const historyIndex = useSelector(historyIndexSelector)
  const dispatch = useDispatch()
  // Flag indicates whether drawing is in process 
  const isDrawing = !!currentStroke.points.length
  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d")}
  }

  // drawing
  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context){
      return
    }
    requestAnimationFrame(() => 
      drawStroke(context, currentStroke.points, currentStroke.color)
    )
  // eslint-disable-next-line
  }, [currentStroke])

  // undo, redo
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()
    if (!canvas || !context){
      return 
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas)

      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
          drawStroke(context, stroke.points, stroke.color)
        })
      }
    )
  // eslint-disable-next-line
  }, [historyIndex])  // linter will warn to add strokes to dependency array 

  const startDrawing = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent
    dispatch(beginStroke(offsetX, offsetY))
  }

  const draw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing){
      return 
    }
    const { offsetX, offsetY } = nativeEvent 
    dispatch(updateStroke(offsetX, offsetY))
  }
  
  const endDrawing = () => {
    if (isDrawing){
      dispatch(endStroke(historyIndex, currentStroke))
    }
    return 
  }


  return (
    <div className="window">
      
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <EditPanel />
      <FilePanel />
      <ColorPanel />
      <canvas 
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef} />
   
    </div>
    
  );
}

export default App;
