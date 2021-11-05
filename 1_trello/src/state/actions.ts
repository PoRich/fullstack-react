import { DragItem } from "../DragItem"; 


// Define action types 
export type Action = |
{
    type: "ADD_LIST"  // type field is mandatory for Actions
    payload: string
}
|{
    type: "ADD_TASK"
    payload: {text: string; listId: string}
}
|{
    type: "MOVE_LIST"
    payload: {
        draggedId: string 
        hoverId: string
    }
}
| {
    type: "SET_DRAGGED_ITEM"
    payload: DragItem | null
}
| {
    type: "MOVE_TASK"
    payload: {
        draggedItemId: string 
        hoveredItemId: string | null 
        sourceColumnId: string 
        targetColumnId: string 
    }
}

// Define Action Creators
export const addList = (
    text: string
): Action => ({
    type: "ADD_LIST",
    payload: text
})

export const addTask = (
    text: string, 
    listId: string,
): Action => ({
    type: "ADD_TASK",
    payload: {
        text,
        listId
    }
})

export const moveList = (
    draggedId: string,
    hoverId: string
): Action => ({
    type: "MOVE_LIST", 
    payload: {
        draggedId,
        hoverId
    }
})

export const setDraggedItem = (
    draggedItem: DragItem | null, 
): Action => ({
    type: "SET_DRAGGED_ITEM",
    payload: draggedItem
})

export const moveTask = (
    draggedItemId: string, 
    hoveredItemId: string | null,
    sourceColumnId: string, 
    targetColumnId: string 
): Action => ({
    type: "MOVE_TASK", 
    payload: {
        draggedItemId, 
        hoveredItemId,
        sourceColumnId, 
        targetColumnId 
    }
})