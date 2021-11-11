export type Point = {
    x: number
    y: number
}

export type Stroke = {
    points: Point[]
    color: string   // hex string
}

export type RootState = {
    currentStroke: Stroke
    strokes: Strokes[]
    historyIndex: number 
}