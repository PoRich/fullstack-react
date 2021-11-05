import { getEmptyImage } from "react-dnd-html5-backend"
import { useDrag } from "react-dnd";
import { useEffect } from "react";
import { useAppState } from "../state/AppStateContext";
import { DragItem } from "../DragItem"
import { setDraggedItem } from "../state/actions";


export const useItemDrag = (item: DragItem) => {
    const { dispatch } = useAppState()
    const [, drag, preview] = useDrag({
        type: item.type,  // CARD or COLUMN
        item: () => {  // Updates state to reflect draggedItem when start dragging
            dispatch(setDraggedItem(item))
            return item 
        },
        end: () => dispatch(setDraggedItem(null))  // Resets draggedItem to null when done dragging
    })
    useEffect(() =>{
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview])
    return { drag }
}