export type CardDragItem = {
    type: "CARD"
    id: string 
    columnId: string
    text: string 
}

export type ColumnDragItem = {
    type: "COLUMN"
    id: string 
    text: string 
}

export type DragItem = CardDragItem | ColumnDragItem