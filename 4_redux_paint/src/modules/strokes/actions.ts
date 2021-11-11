import { Stroke } from "../../types"

export const END_STROKE = "END_STROKE"

export type Action = {
    type: typeof END_STROKE
    payload: { stroke: Stroke; historyLimit: number }
}

// define types
export type HistoryIndexAction = {
    type: typeof END_STROKE
    payload: {stroke: Stroke; historyLimit: number}
}

// action creators 
export const endStroke = (historyLimit: number, stroke: Stroke) => {
    return { type: END_STROKE, payload: { historyLimit, stroke}}
}