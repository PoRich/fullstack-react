import { Stroke } from "../../types"

export const UNDO = "UNDO"
export const REDO = "REDO"
export const END_STROKE = "END_STROKE"

// define types
export type HistoryIndexAction = 
|{
    type: typeof UNDO
    payload: number
}
|{
    type: typeof REDO
}
| {
    type: typeof END_STROKE
    payload: {stroke: Stroke; historyLimit: number}
}

// action creators 
export const undo = (undoLimit: number) => {
    return { type: UNDO, payload: undoLimit }
  }
  
export const redo = () => {
    return { type: REDO }
  }

export const endStroke = () => {
    return { type: END_STROKE}
}